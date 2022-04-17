import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';
import { Advisor } from 'src/advisor/advisor.entity';

@Entity({ name: 'message' })
export class Message {

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  message: string;

  @Column({ default: false })
  read?: boolean;

  @ManyToOne(() => Student, student => student.messages)
  student: Student;

  @ManyToOne(() => Advisor, advisor => advisor.messages)
  advisor: Advisor;

  @Column({ default: false })
  sentByAdvisor?: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
