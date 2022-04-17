import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdvisorService } from './advisor.service';
import { Advisor } from './advisor.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('/api/advisors')
export class AdvisorController {
  constructor(private readonly advisorService: AdvisorService) { }

  @Get()
  async findAll(): Promise<Advisor[]> {
    try {
      return await this.advisorService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find advisors`);
    }
  }

  @Get(':employeeId')
  async findAdvisorById(@Param('employeeId') id: string): Promise<Advisor> {
    try {
      const advisorId = Buffer.from(id, "base64").toString();
      return await this.advisorService.findOneByAdvisorId(advisorId);
    } catch (error) {
      throw new NotFoundException("Cannot find advisor");
    }
  }
  @Get('department/:department')
  async findAdvisorByDepartment(@Param('department') department: string): Promise<Advisor[]> {
    try {
      return await this.advisorService.findAllByDepartment(department);
    } catch (error) {
      throw new NotFoundException("Cannot find advisors");
    }
  }
}
