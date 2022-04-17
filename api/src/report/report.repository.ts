import { Report } from './report.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Report)
export class ReportRepository extends Repository<Report> { }
