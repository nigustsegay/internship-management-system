import { Advisor } from './advisor.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Advisor)
export class AdvisorRepository extends Repository<Advisor> { }
