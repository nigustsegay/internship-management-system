import { Module, forwardRef } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { RequestRepository } from './request.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, RequestRepository]),
    forwardRef(() => AuthModule), forwardRef(() => UserModule),
    forwardRef(() => CompanyModule)
  ],
  providers: [RequestService, AuthService],
  controllers: [RequestController],
  exports: [RequestService],
})
export class RequestModule { }
