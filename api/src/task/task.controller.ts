import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { CreateTaskDto, MarkTaskDto } from './dto/task.dto';
import { StudentService } from 'src/student/student.service';

@Controller('/api/tasks')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly studentService: StudentService,
  ) { }

  @Get()
  async findAll(): Promise<Task[]> {
    try {
      return await this.taskService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find tasks`);
    }
  }

  @Get('student/:studentId')
  async findTaskByStudentId(@Param('studentId') id: string): Promise<Task[]> {
    try {
      const studentId = Buffer.from(id, "base64").toString();
      return await this.taskService.findAllByStudent(studentId);
    } catch (error) {
      throw new NotFoundException("Cannot find task");
    }
  }

  @Get(':taskId')
  async findTaskById(@Param('taskId') id: string): Promise<Task> {
    try {
      const taskId = Buffer.from(id, "base64").toString();
      return await this.taskService.findById(taskId);
    } catch (error) {
      throw new NotFoundException("Cannot find task");
    }
  }

  @Post()
  async CreateTask(
    @Body() payload: CreateTaskDto,
  ) {
    try {
      const student = await this.studentService.findOneByStudentId(payload.studentId);
      if (student) {
        return await this.taskService.create({ ...payload, student })
      }
      throw new NotFoundException("Student not found");

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("complete")
  async MarkComplete(
    @Body() payload: MarkTaskDto,
  ) {
    try {
      const accepted = await this.taskService.markCompleted(payload.taskId);
      if (!accepted) {
        throw new NotFoundException("No Task found");
      }

      return { message: "accepted" };

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
