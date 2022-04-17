import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advisor } from './advisor.entity';
import { AdvisorRepository } from './advisor.repository';

export type AdvisorPayload = Omit<Advisor, "createdAt" | "updatedAt">

@Injectable()
export class AdvisorService {
  constructor(
    @InjectRepository(AdvisorRepository)
    private readonly advisorRepository: AdvisorRepository,
  ) { }

  async findAll(): Promise<Advisor[]> {
    return await this.advisorRepository.find();
  }

  async findOneByUserId(id: string): Promise<Advisor> {
    return await this.advisorRepository.findOne({ where: { user: { id } } });
  }

  async findAllByDepartment(department: string): Promise<Advisor[]> {
    return await this.advisorRepository.find({ where: { department } });
  }

  async findOneByAdvisorId(employeeId: string): Promise<Advisor> {
    return await this.advisorRepository.findOne({
      where: { employeeId },
    });
  }

  async create(advisor: AdvisorPayload): Promise<Advisor> {
    const newAdvisor = this.advisorRepository.create(advisor);
    return await this.advisorRepository.save(newAdvisor);
  }
}
