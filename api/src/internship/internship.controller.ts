import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { InternshipService } from './internship.service';
import { Internship } from './internship.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { InternshipApplyDto, AssignCompanyDto, AssignAdvisorDto } from './dto/internship.dto';
import { StudentService } from 'src/student/student.service';
import { CompanyService } from 'src/company/company.service';
import { AdvisorService } from 'src/advisor/advisor.service';
import { RequestService } from 'src/request/request.service';

@Controller('/api/internships')
export class InternshipController {
  constructor(
    private readonly internshipService: InternshipService,
    private readonly studentService: StudentService,
    private readonly companyService: CompanyService,
    private readonly advisorService: AdvisorService,
    private readonly requestService: RequestService
  ) { }

  @Get()
  async findAll(): Promise<Internship[]> {
    try {
      return await this.internshipService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find internships`);
    }
  }

  @Get('student/:studentId')
  async findInternshipByStudentId(@Param('studentId') id: string): Promise<Internship> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.internshipService.findOneByStudent(studentId);
    } catch (error) {
      throw new NotFoundException("Cannot find internship");
    }
  }

  @Get('advisor/:employeeId')
  async findInternshipByEmployeeId(@Param('employeeId') id: string): Promise<Internship[]> {
    try {
      const employeeId = Buffer.from(id, "base64").toString();
      return await this.internshipService.findAllByAdvisor(employeeId);
    } catch (error) {
      throw new NotFoundException("Cannot find internships");
    }
  }

  @Get('company/:companyName')
  async findInternshipByCompanyName(@Param('companyName') id: string): Promise<Internship[]> {
    try {
      const companyName = Buffer.from(id, "base64").toString();
      return await this.internshipService.findAllByCompany(companyName);
    } catch (error) {
      throw new NotFoundException("Cannot find internships");
    }
  }

  @Get('pending')
  async findAllPendingInternships(): Promise<Internship[]> {
    try {
      return await this.internshipService.findAllPending();
    } catch (error) {
      throw new NotFoundException("Cannot find internships");
    }
  }
  @Post("apply")
  async ApplyForInternship(
    @Body() payload: InternshipApplyDto,
  ) {
    try {
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      if (student) {
        return await this.internshipService.create({ documentOfIntent: payload.documentOfIntent, student })
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("assign-company")
  async AssignCompany(
    @Body() payload: AssignCompanyDto,
  ) {
    try {
      const company = await this.companyService.findOneByCompanyName(payload.companyName);
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      if (company && student) {
        await this.requestService.decrement(company.name, student.department);
        return await this.internshipService.assignCompany(payload.studentId, company);
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("assign-advisor")
  async AssignAdvisor(
    @Body() payload: AssignAdvisorDto,
  ) {
    try {
      const advisor = await this.advisorService.findOneByAdvisorId(payload.advisorId)
      if (advisor) {
        return await this.internshipService.assignAdvisor(payload.studentId, advisor);
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
