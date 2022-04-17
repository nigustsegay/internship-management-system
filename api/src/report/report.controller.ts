import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { Report } from './report.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateReportDto } from './dto/report.dto';
import { StudentService } from 'src/student/student.service';

@Controller('/api/reports')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly studentService: StudentService,
  ) { }

  @Get()
  async findAll(): Promise<Report[]> {
    try {
      return await this.reportService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find reports`);
    }
  }

  @Get('student/:studentId')
  async findReportByStudentId(@Param('studentId') id: string): Promise<Report[]> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.reportService.findAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException("Cannot find reports");
    }
  }

  @Post()
  async CreateReport(
    @Body() payload: CreateReportDto,
  ) {
    try {
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      if (student) {
        return await this.reportService.create({ ...payload, student })
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
