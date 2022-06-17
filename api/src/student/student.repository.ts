import { Student } from './student.entity';
import { EntityRepository, Repository } from 'typeorm';
fghh
@EntityRepository(Student)
export class StudentRepository extends Repository<Student> { }
