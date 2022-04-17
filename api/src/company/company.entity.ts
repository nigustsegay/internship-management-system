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
import { Request } from 'src/request/request.entity';
@Entity({ name: 'company' })
export class Company {

  @PrimaryColumn()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  logo?: string;

  @OneToMany(() => Internship, internship => internship.company)
  interns?: Internship[];

  @OneToMany(() => Request, request => request.company)
  requests?: Request[];

  @OneToOne(() => User, { eager: true }) @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
