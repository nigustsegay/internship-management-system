import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { Attendance } from './attendance.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { StudentService } from 'src/student/student.service';

@Controller('/api/attendances')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly studentService: StudentService,
  ) { }

  @Get()
  async findAll(): Promise<Attendance[]> {
    try {
      return await this.attendanceService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find attendances`);
    }
  }

  @Get('student/:studentId')
  async findAttendanceByStudentId(@Param('studentId') studentId: string): Promise<Attendance[]> {
    try {
      return await this.attendanceService.findAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException(`Cannot find attendance #${studentId}`);
    }
  }

  @Post()
  async CreateAttendance(
    @Body() payload: CreateAttendanceDto,
  ) {
    try {
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      if (student) {
        return await this.attendanceService.create({ ...payload, student })
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
