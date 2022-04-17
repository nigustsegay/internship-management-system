import { Module, forwardRef } from '@nestjs/common';
import { AdvisorController } from './advisor.controller';
import { AdvisorService } from './advisor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advisor } from './advisor.entity';
import { AdvisorRepository } from './advisor.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advisor, AdvisorRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => MessageModule)
  ],
  providers: [AdvisorService, AuthService],
  controllers: [AdvisorController],
  exports: [AdvisorService],
})
export class AdvisorModule { }
