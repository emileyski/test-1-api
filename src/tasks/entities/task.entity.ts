import { TaskStatusEnum } from 'src/core/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: new Date() })
  start: Date;

  @Column({ nullable: true })
  end?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ default: TaskStatusEnum.OPEN, type: 'enum', enum: TaskStatusEnum })
  status: TaskStatusEnum;

  @OneToMany(() => TaskStatus, (status) => status.task, { cascade: true })
  statuses: TaskStatus[];
}
