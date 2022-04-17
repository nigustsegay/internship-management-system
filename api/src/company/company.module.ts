import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { RequestModule } from 'src/request/request.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, CompanyRepository]),
    forwardRef(() => AuthModule), forwardRef(() => UserModule),
    forwardRef(() => RequestModule)
  ],
  providers: [CompanyService, AuthService],
  controllers: [CompanyController],
  exports: [CompanyService],
})
export class CompanyModule { }
