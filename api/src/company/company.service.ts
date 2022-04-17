import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';

export type CompanyPayload = Omit<Company, "createdAt" | "updatedAt">

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) { }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOneByCompanyName(name: string): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { name },
    });
  }
  async findOneByUserId(id: string): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { user: { id } },
    });
  }
  async findOneByUserEmail(email: string): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { user: { email } },
    });
  }

  async create(company: CompanyPayload): Promise<Company> {
    const newCompany = await this.companyRepository.create(company);
    return await this.companyRepository.save(newCompany);
  }
}
