import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Internship } from './internship.entity';
import { Company } from 'src/company/company.entity';
import { Advisor } from 'src/advisor/advisor.entity';
import { InternshipRepository } from './internship.repository';

export type InternshipPayload = Omit<Internship, "createdAt" | "updatedAt">

@Injectable()
export class InternshipService {
  constructor(
    @InjectRepository(InternshipRepository)
    private readonly internshipRepository: InternshipRepository,
  ) { }

  async findAll(): Promise<Internship[]> {
    return await this.internshipRepository.find();
  }

  async findAllPending(): Promise<Internship[]> {
    return await this.internshipRepository.find({ where: { advisor: null, company: null } });
  }

  async findOneByStudent(studentId: string): Promise<Internship> {
    return await this.internshipRepository.findOne({
      where: { student: { studentId } },
    });
  }

  async findAllByAdvisor(employeeId: string): Promise<Internship[]> {
    return await this.internshipRepository.find({
      where: { advisor: { employeeId } }
    });
  }

  async findAllByCompany(companyName: string): Promise<Internship[]> {
    return await this.internshipRepository.find({
      where: { company: { name: companyName } },
    });
  }

  async create(internship: InternshipPayload): Promise<Internship> {
    const newInternship = await this.internshipRepository.create(internship);
    return await this.internshipRepository.save(newInternship);
  }

  async assignCompany(studentId: string, company: Company): Promise<boolean> {
    const r = await this.internshipRepository.update({ student: { studentId } }, { company });
    return r.affected > 0
  }
  async assignAdvisor(studentId: string, advisor: Advisor): Promise<boolean> {
    const r = await this.internshipRepository.update({ student: { studentId } }, { advisor });
    return r.affected > 0
  }
}
