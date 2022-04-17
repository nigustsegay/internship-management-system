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

import { User } from 'src/user/user.entity';
import { Internship } from 'src/internship/internship.entity';
import { Message } from 'src/message/message.entity';

@Entity({ name: 'advisor' })
export class Advisor {
  @PrimaryColumn({ name: "employee_id" })
  employeeId: string;

  @Column()
  department: string;

  @OneToOne(() => User, { eager: true }) @JoinColumn()
  user: User;

  @OneToMany(() => Message, message => message.advisor)
  messages?: Message[];

  @OneToMany(() => Internship, internship => internship.advisor)
  interns?: Internship[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
