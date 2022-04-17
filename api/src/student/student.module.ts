import { Module, forwardRef } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { InternshipModule } from "../internship/internship.module";
import { AttendanceModule } from "../attendance/attendance.module";
import { ReportModule } from "../report/report.module";
import { TaskModule } from "../task/task.module";
import { MessageModule } from 'src/message/message.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Student, StudentRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => InternshipModule),
    forwardRef(() => AttendanceModule),
    forwardRef(() => ReportModule),
    forwardRef(() => TaskModule),
    forwardRef(() => MessageModule),
  ],
  providers: [StudentService, AuthService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule { }
