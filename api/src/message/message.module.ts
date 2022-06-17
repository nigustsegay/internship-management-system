import { Module, forwardRef } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../user/user.module';
import { StudentModule } from 'src/student/student.module';
import { AdvisorModule } from 'src/advisor/advisor.module';
cccc
@Module({
  imports: [
    TypeOrmModule.forFeature([Message, MessageRepository]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => StudentModule),
    forwardRef(() => AdvisorModule)
  ],
  providers: [MessageService, AuthService],
  controllers: [MessageController],
  exports: [MessageService],
})
export class MessageModule { }
