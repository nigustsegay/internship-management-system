import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  ADVISOR = 'ADVISOR',
  COMPANY = 'COMPANY',
  STUDENT = 'STUDENT',
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  fullname: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({
    type: 'simple-enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ name: "profile_picture", nullable: true })
  profilePicture?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column({ select: false })
  password: string;

  @Column({
    default: 0,
  })
  tokenVersion?: number;
}
