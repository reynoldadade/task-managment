import { Task } from './task.entity';
import { User } from './../auth/user.entity';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.description = description;
        task.title = title;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        try {
        delete task.user;
        return task;
       } catch (error) {
           this.logger.error(`Failed to create a task for "${user.username}". Data: ${JSON.stringify(createTaskDto)}`, error.stack);
       }
    }

    async getTask(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', {userId: user.id});

        if (status) {
            query.andWhere('task.status = :status', { status});
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%` });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}
