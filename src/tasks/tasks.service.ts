import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
            }
        return found;

    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return this.taskRepository.createTask(createTaskDto);
    }

    async deleteTaskById(id: number): Promise<string> {
       const result = await this.taskRepository.delete(id);

       if (result.affected === 0) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
       }
       return `Deleted ${result.affected} entries`;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;

    }

    // deleteTaskById(id: string): void {
    //     // const del = this.tasks.find(task => task.id === id);
    //     // const index = this.tasks.indexOf(del);
    //     // if (index > -1) {
    //     //     this.tasks.splice(index, 1);
    //     // }
    //     // return del;
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(tasks => tasks.id !== found.id);

    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search} = filterDto;

    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //             );
    //     }

    //     return tasks;
    // }
}
