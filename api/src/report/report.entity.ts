import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';

@Entity({ name: 'report' })
export class Report {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @ManyToOne(() => Student, student => student.reports, { nullable: false })
  student: Student;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
