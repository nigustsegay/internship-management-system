import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity({ name: 'task' })
export class Task {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ default: false })
  completed?: boolean;

  @ManyToOne(() => Student, student => student.tasks, { nullable: false })
  student: Student;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
