import { Module, forwardRef } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { StudentModule } from 'src/student/student.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, TaskRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => StudentModule),
    forwardRef(() => UserModule),
  ],
  providers: [TaskService, AuthService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule { }
