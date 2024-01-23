import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  findAll() {
    return this.taskRepository.find();
  }

  findOne(id: string) {
    return this.taskRepository.findOne({
      where: { id },
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

  async remove(id: string) {
    const removedTask = await this.taskRepository.delete(id);

    if (!removedTask.affected) {
      throw new NotFoundException(`Task #${id} not found`);
    }

    return { message: `Task #${id} deleted` };
  }
}
