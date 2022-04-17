import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';

import { Student } from 'src/student/student.entity';
import { Company } from 'src/company/company.entity';
import { Advisor } from 'src/advisor/advisor.entity';

@Entity({ name: 'internship' })
export class Internship {

  @Column({ nullable: true, name: "document_of_intent" })
  documentOfIntent?: string;

  @OneToOne(() => Student, { eager: true, nullable: false, primary: true }) @JoinColumn()
  student: Student;

  @ManyToOne(() => Advisor, advisor => advisor.interns, { nullable: true, eager: true })
  advisor?: Advisor;

  @ManyToOne(() => Company, company => company.interns, { nullable: true, eager: true })
  company?: Company;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
