import { TaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class GetTaskFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @ApiModelPropertyOptional({enum : ['IN_PROGRESS', 'OPEN', 'DONE']})
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    @ApiModelPropertyOptional()
    search: string;
}
