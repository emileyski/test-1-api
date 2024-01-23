import { TaskStatus } from 'src/core/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt?: Date;

  @Column({ default: TaskStatus.OPEN, type: 'enum', enum: TaskStatus })
  status: TaskStatus;
}
