import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';

import { Company } from 'src/company/company.entity';

@Entity({ name: 'request' })
export class Request {

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  department: string;

  @Column({ default: 1 })
  quantity?: number;

  @Column({ default: 1 })
  initialQuantity?: number;

  @Column({ default: false })
  accepted?: boolean;

  @ManyToOne(() => Company, company => company.requests, { eager: true, })
  company: Company;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
