import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportRepository } from './report.repository';

export type ReportPayload = Omit<Report, "createdAt" | "updatedAt">

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportRepository)
    private readonly reportRepository: ReportRepository,
  ) { }

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.find();
  }

  async findAllByStudent(studentId: string): Promise<Report[]> {
    return await this.reportRepository.find({
      where: { student: { studentId } },
    });
  }

  async create(report: ReportPayload): Promise<Report> {
    const newReport = this.reportRepository.create(report);
    return await this.reportRepository.save(newReport);
  }

}
