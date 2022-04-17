import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('/api/companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Get()
  async findAll(): Promise<Company[]> {
    try {
      return await this.companyService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find companies`);
    }
  }

  @Get(':name')
  async findCompanyById(@Param('name') id: string): Promise<Company> {
    try {
      const companyName = Buffer.from(id, "base64").toString();
      return await this.companyService.findOneByCompanyName(companyName);
    } catch (error) {
      throw new NotFoundException("Cannot find company");
    }
  }
}
