import { Controller, Get, NotFoundException, Param, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequestService } from './request.service';
import { CompanyService } from 'src/company/company.service';
import { Request } from './request.entity';
import { UserRole } from 'src/user/user.entity';
import { Roles } from '../auth/decorator/roles.decorator';
import { RequestDto, RequestAcceptDto, RequestRejectDto } from './dto/request.dto';

@Controller('/api/intern-requests')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly companyService: CompanyService
  ) { }

  @Get()
  async findAll(): Promise<Request[]> {
    try {
      return await this.requestService.findAll();
    } catch (error) {
      throw new NotFoundException(`Cannot find requests`);
    }
  }

  @Get("pending")
  async findAllPending(): Promise<Request[]> {
    try {
      return await this.requestService.findAllPending();
    } catch (error) {
      throw new NotFoundException(`Cannot find requests`);
    }
  }

  @Get("department/:department")
  async findAllByDepartment(@Param('department') department: string): Promise<Request[]> {
    try {
      return await this.requestService.findAllValidByDepartment(department);
    } catch (error) {
      throw new NotFoundException(`Cannot find requests`);
    }
  }



  @Get("company/:company")
  async findAllByCompany(@Param('company') id: string): Promise<Request[]> {
    try {
      const companyName = Buffer.from(id, "base64").toString();
      return await this.requestService.findAllByCompanyName(companyName);
    } catch (error) {
      throw new NotFoundException(`Cannot find requests`);
    }
  }

  @Get(':requestId')
  async findRequestById(@Param('requestId') id: string): Promise<Request> {
    try {
      const requestId = Buffer.from(id, "base64").toString();
      return await this.requestService.findOneByRequestId(requestId);
    } catch (error) {
      throw new NotFoundException("Cannot find request");
    }
  }

  @Post()
  async AddRequest(
    @Body() request: RequestDto,
  ): Promise<Request> {
    try {

      const company = await this.companyService.findOneByCompanyName(request.companyName);
      if (!company) {
        throw new NotFoundException("Company not found!");
      }
      return await this.requestService.create({ ...request, company, initialQuantity: request.quantity })

    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("accept")
  async AcceptRequest(
    @Body() { requestId }: RequestAcceptDto,
  ) {
    try {

      const accepted = await this.requestService.accept(requestId);
      if (!accepted) {
        throw new NotFoundException("No Request found");
      }

      return { message: "accepted" };


    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }

  @Post("reject")
  async RejectRequest(
    @Body() { requestId }: RequestAcceptDto,
  ) {
    try {

      const accepted = await this.requestService.reject(requestId);
      if (!accepted) {
        throw new NotFoundException("No Request found");
      }

      return { message: "accepted" };


    } catch (error) {
      throw new BadRequestException('Failed to add request', error);
    }
  }
}
