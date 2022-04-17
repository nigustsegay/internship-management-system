import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

export type TaskPayload = Omit<Task, "createdAt" | "updatedAt">

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) { }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findById(id: string): Promise<Task> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async findAllByStudent(studentId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { student: { studentId } },
    });
  }

  async create(task: TaskPayload): Promise<Task> {
    const newTask = this.taskRepository.create(task);
    return await this.taskRepository.save(newTask);
  }

  async markCompleted(taskId: string): Promise<boolean> {
    const r = await this.taskRepository.update({ id: taskId }, { completed: true });
    return r.affected > 0
  }

}
