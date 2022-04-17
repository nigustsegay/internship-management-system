import { Internship } from './internship.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Internship)
export class InternshipRepository extends Repository<Internship> { }
