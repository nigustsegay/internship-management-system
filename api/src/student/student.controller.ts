import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { InternshipService } from "src/internship/internship.service"
import { Student } from './student.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';


@Controller('/api/students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly internshipService: InternshipService,
  ) { }

  @Get()
  async findAll(): Promise<Student[]> {
    try {
      return await this.studentService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find students`);
    }
  }

  @Get(':studentId')
  async findStudentById(@Param('studentId') id: string): Promise<Student> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      const student = await this.studentService.findOneByStudentId(studentId);
      const internship = await this.internshipService.findOneByStudent(studentId);
      return { ...student, internship };

    } catch (error) {
      throw new NotFoundException("Cannot find student");
    }
  }
}
