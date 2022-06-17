import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentRepository } from './student.repository';

export type StudentPayload = Omit<Student, "createdAt" | "updatedAt">
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private readonly studentRepository: StudentRepository,
  ) { }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOneByUserId(id: string): Promise<Student> {
    return await this.studentRepository.findOne({ where: { user: { id } } });
  }

  async findOneByStudentId(studentId: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { studentId }, relations: ["tasks", "reports", "internship", "attendance"]
    });
  }

  async create(student: StudentPayload): Promise<Student> {
    const newStudent = await this.studentRepository.create(student);
    return await this.studentRepository.save(newStudent);
  }
}
