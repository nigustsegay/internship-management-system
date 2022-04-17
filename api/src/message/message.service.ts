import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { MessageRepository } from './message.repository';

export type MessagePayload = Omit<Message, "createdAt" | "updatedAt">

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageRepository)
    private readonly messageRepository: MessageRepository,
  ) { }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async readAllByAdvisor(employeeId: string): Promise<Message[]> {
    await this.messageRepository.update({ advisor: { employeeId } }, { read: true });
    return await this.messageRepository.find({
      where: { advisor: { employeeId } },
    });
  }

  async readAllByStudent(studentId: string): Promise<Message[]> {
    await this.messageRepository.update({ student: { studentId } }, { read: true });
    return await this.messageRepository.find({
      where: { student: { studentId } },
    });
  }

  async readAllByStudentAndAdvisor(studentId: string, employeeId: string): Promise<Message[]> {
    await this.messageRepository.update({ student: { studentId }, advisor: { employeeId } }, { read: true });
    return await this.messageRepository.find({
      where: { student: { studentId }, advisor: { employeeId } },
    });
  }

  async findAllByAdvisor(employeeId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { advisor: { employeeId } },
    });
  }

  async findAllByStudent(studentId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { student: { studentId } },
    });
  }

  async create(message: MessagePayload): Promise<Message> {
    const newMessage = this.messageRepository.create(message);
    return await this.messageRepository.save(newMessage);
  }
}
