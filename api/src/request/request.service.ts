import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './request.entity';
import { LessThan, Not } from 'typeorm';
import { RequestRepository } from './request.repository';

export type RequestPayload = Omit<Request, "createdAt" | "updatedAt">

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestRepository)
    private readonly requestRepository: RequestRepository,
  ) { }

  async findAll(): Promise<Request[]> {
    return await this.requestRepository.find();
  }
  async findAllPending(): Promise<Request[]> {
    return await this.requestRepository.find({ where: { accepted: false } });
  }
  async findAllValidByDepartment(department: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { accepted: true, department, quantity: Not(LessThan(1)) } });
  }

  async findAllByCompanyName(companyName: string): Promise<Request[]> {
    return await this.requestRepository.find({ where: { company: { name: companyName } } });
  }

  async findOneByRequestId(id: string): Promise<Request> {
    return await this.requestRepository.findOne({
      where: { id },
    });
  }
  async create(request: RequestPayload): Promise<Request> {
    const newRequest = await this.requestRepository.create(request);
    return await this.requestRepository.save(newRequest);
  }

  async accept(id: string): Promise<boolean> {
    const r = await this.requestRepository.update({ id }, { accepted: true });
    return r.affected > 0
  }
  async reject(id: string): Promise<boolean> {
    const r = await this.requestRepository.delete({ id });
    return r.affected > 0
  }
  async decrement(companyName: string, department: string): Promise<Request | boolean> {
    const r = await this.requestRepository.findOne({ where: { company: { name: companyName }, department } });
    if (r.quantity > 0) {
      r.quantity -= 1;
    }
    if (r.quantity < 1) {
      // the request has been exhausted so delete the request
      const r = await this.requestRepository.delete({ company: { name: companyName }, department });
      return r.affected > 0
    }
    return await this.requestRepository.save(r);
  }
}
