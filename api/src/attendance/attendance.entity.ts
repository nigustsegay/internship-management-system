import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity({ name: 'attendance' })
export class Attendance {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  date: string;

  @Column({ default: true })
  absent?: boolean;

  @ManyToOne(() => Student, student => student.attendance, { nullable: false })
  student: Student;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
