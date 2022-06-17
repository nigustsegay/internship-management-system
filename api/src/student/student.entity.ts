import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
fge
import { User } from 'src/user/user.entity';
import { Report } from 'src/report/report.entity';
import { Task } from "src/task/task.entity";
import { Attendance } from 'src/attendance/attendance.entity';
import { Internship } from 'src/internship/internship.entity';
import { Message } from 'src/message/message.entity';

@Entity({ name: 'student' })
export class Student {
  @PrimaryColumn({ name: "student_id" })
  studentId: string;

  @Column()
  department: string;

  @OneToOne(() => User, { eager: true }) @JoinColumn()
  user: User;

  @OneToMany(() => Message, message => message.student, { eager: true })
  messages?: Message[];

  @OneToOne(() => Internship, internship => internship.student) @JoinColumn()
  internship?: Internship;

  @OneToMany(() => Report, report => report.student)
  reports?: Report[];

  @OneToMany(() => Task, task => task.student)
  tasks?: Task[];

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendance?: Attendance[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
