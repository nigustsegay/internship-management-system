import { Module, forwardRef } from '@nestjs/common';
import { InternshipController } from './internship.controller';
import { InternshipService } from './internship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Internship } from './internship.entity';
import { InternshipRepository } from './internship.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { RequestModule } from 'src/request/request.module';
import { StudentModule } from 'src/student/student.module';
import { CompanyModule } from 'src/company/company.module';
import { AdvisorModule } from 'src/advisor/advisor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Internship, InternshipRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => RequestModule),
    forwardRef(() => StudentModule),
    forwardRef(() => CompanyModule),
    forwardRef(() => AdvisorModule)
  ],
  providers: [InternshipService, AuthService],
  controllers: [InternshipController],
  exports: [InternshipService],
})
export class InternshipModule { }
