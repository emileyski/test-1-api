import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskStatus } from './entities/task-status.entity';
import { TaskStatusEnum } from 'src/core/enums';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.save(createTaskDto);

    const taskStatus = this.taskStatusRepository.create({
      task: { id: task.id },
    });

    await this.taskStatusRepository.save(taskStatus);

    return task;
  }

  findAll() {
    return this.taskRepository.find({
      relations: ['statuses'],
    });
  }

  findOne(id: string) {
    return this.taskRepository.findOne({
      where: { id },
      relations: ['statuses'],
    });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    this.taskRepository.merge(task, updateTaskDto);
    task.updatedAt = new Date();

    return this.taskRepository.save(task);
  }

  async setStatus(id: string, status: TaskStatusEnum) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['statuses'],
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    if (task.status === status) {
      throw new NotFoundException(`Task #${id} already ${status}`);
    }

    const taskStatus = this.taskStatusRepository.create({
      task: { id: task.id },
      status,
    });

    //Update task status and endedAt of the previous status
    task.status = status;
    task.updatedAt = new Date();
    task.statuses[task.statuses.length - 1].endedAt = new Date();
    await this.taskRepository.save(task);

    return this.taskStatusRepository.save(taskStatus);
  }

  async remove(id: string) {
    const removedTask = await this.taskRepository.delete(id);

    if (!removedTask.affected) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return { message: `Task #${id} deleted` };
  }
}
