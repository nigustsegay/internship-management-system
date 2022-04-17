import { Company } from './company.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> { }
