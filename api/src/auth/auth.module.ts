import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { StudentModule } from "../student/student.module";
import { AdvisorModule } from "../advisor/advisor.module";
import { CompanyModule } from "../company/company.module";

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => StudentModule),
    forwardRef(() => AdvisorModule),
    forwardRef(() => CompanyModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
