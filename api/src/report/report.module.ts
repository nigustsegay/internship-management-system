import { Module, forwardRef } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { StudentModule } from 'src/student/student.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, ReportRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => StudentModule),
    forwardRef(() => UserModule),
  ],
  providers: [ReportService, AuthService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule { }
