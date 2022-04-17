import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { CompanyModule } from "./company/company.module";
import { AdvisorModule } from "./advisor/advisor.module";
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/role.guard';
import { StorageModule } from './storage/storage.module';
import { RequestModule } from './request/request.module';
import { InternshipModule } from './internship/internship.module';
import { ReportModule } from './report/report.module';
import { TaskModule } from './task/task.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    StudentModule,
    CompanyModule,
    AdvisorModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StorageModule,
    RequestModule,
    InternshipModule,
    ReportModule,
    TaskModule,
    AttendanceModule,
    MessageModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}