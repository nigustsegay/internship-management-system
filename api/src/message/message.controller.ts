import { Controller, Get, NotFoundException, Param, Query, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { Message } from './message.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { SendMessageDto } from './dto/message.dto';
import { StudentService } from 'src/student/student.service';
import { AdvisorService } from 'src/advisor/advisor.service';

@Controller('/api/messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly studentService: StudentService,
    private readonly advisorService: AdvisorService,
  ) { }

  @Get()
  async findAll(): Promise<Message[]> {
    try {
      return await this.messageService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find messages`);
    }
  }

  @Get('student/:studentId')
  async findMessagesByStudentId(@Param('studentId') id: string): Promise<Message[]> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.messageService.findAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException("Cannot find messages");
    }
  }

  @Get('advisor/:employeeId')
  async findMessageByEmployeeId(@Param('employeeId') id: string): Promise<Message[]> {
    try {
      const employeeId = Buffer.from(id, "base64").toString();
      return await this.messageService.findAllByAdvisor(employeeId);
    } catch (error) {
      throw new NotFoundException("Cannot find messages");
    }
  }

  @Get('read/student/:studentId')
  async readMessagesByStudentId(@Param('studentId') id: string): Promise<Message[]> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.messageService.readAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException("Cannot find messages");
    }
  }

  @Get('read')
  async readMessagesByStudentIdAndEmployeeId(@Query('studentId') sId: string, @Query('employeeId') eId: string): Promise<Message[]> {
    try {
      const studentId = Buffer.from(sId, "base64").toString();
      const employeeId = Buffer.from(eId, "base64").toString();
      return await this.messageService.readAllByStudentAndAdvisor(studentId, employeeId);
    } catch (error) {
      throw new NotFoundException("Cannot find messages");
    }
  }

  @Get('read/advisor/:employeeId')
  async readMessageByEmployeeId(@Param('employeeId') id: string): Promise<Message[]> {
    try {
      const employeeId = Buffer.from(id, "base64").toString();
      return await this.messageService.readAllByAdvisor(employeeId);
    } catch (error) {
      throw new NotFoundException("Cannot find messages");
    }
  }

  @Post()
  async SendMessage(
    @Body() payload: SendMessageDto,
  ) {
    try {
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      const advisor = await this.advisorService.findOneByAdvisorId(payload.advisorId);
      if (student && advisor) {
        return await this.messageService.create({ sentByAdvisor: payload.sentByAdvisor, student, advisor, message: payload.message })
      }
      throw new NotFoundException("Student  or Advisor not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
