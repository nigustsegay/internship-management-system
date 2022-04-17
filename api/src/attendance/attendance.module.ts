import { Module, forwardRef } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './attendance.entity';
import { AttendanceRepository } from './attendance.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { StudentModule } from 'src/student/student.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attendance, AttendanceRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => StudentModule),
    forwardRef(() => UserModule),
  ],
  providers: [AttendanceService, AuthService],
  controllers: [AttendanceController],
  exports: [AttendanceService],
})
export class AttendanceModule { }
