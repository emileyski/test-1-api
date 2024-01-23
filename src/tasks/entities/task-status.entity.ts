import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { TaskStatusEnum } from 'src/core/enums';

@Entity()
export class TaskStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ nullable: true })
  endedAt: Date;

  @Column({ default: TaskStatusEnum.OPEN, enum: TaskStatusEnum, type: 'enum' })
  status: TaskStatusEnum;

  @ManyToOne(() => Task, (task) => task.statuses, { onDelete: 'CASCADE' })
  task: Task;
}
