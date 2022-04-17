import {
  Controller,
  Post,
  Req,
  Body,
  Logger,
  BadRequestException,
  ForbiddenException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterStudentDto, RegisterAdvisorDto, RegisterCompanyDto } from './dto/registerUser.dto';
import { LoginResponse } from './type/loginResponse';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/loginUser.dto';
import { User, UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { StudentService } from 'src/student/student.service';
import { AdvisorService } from 'src/advisor/advisor.service';
import { CompanyService } from 'src/company/company.service';
import { CookieInterceptor } from './interceptor/cookie.interceptor';

@UseInterceptors(CookieInterceptor)
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly studentService: StudentService,
    private readonly advisorService: AdvisorService,
    private readonly companyService: CompanyService,
  ) {
  }

  async hashPassword(password: string) {
    // Hash user password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }


  async checkUserExists(email: string): Promise<boolean> {
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists.');
    }
    return false;
  }

  @Post('register/admin')
  async registerAdmin(
    @Body() registerDto: RegisterUserDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.ADMIN,
        password: hashedPassword,
      });
      const { id, role, email, fullname, profilePicture, tokenVersion } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, email, fullname, role, profilePicture };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('register/advisor')
  async registerAdvisor(
    @Body() registerDto: RegisterAdvisorDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.ADVISOR,
        password: hashedPassword,
      });
      const { employeeId: advisorId } = await this.advisorService.create({ ...registerDto, user })
      const { id, role, email, fullname, profilePicture, tokenVersion } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, fullname, email, role, profilePicture, advisorId };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('register/company')
  async registerCompany(
    @Body() registerDto: RegisterCompanyDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.COMPANY,
        password: hashedPassword,
      });
      const { name: companyName } = await this.companyService.create({ ...registerDto, user })
      const { id, role, email, fullname, tokenVersion, profilePicture } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, fullname, email, role, profilePicture, companyName };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('register/student')
  async registerStudent(
    @Body() registerDto: RegisterStudentDto,
  ): Promise<LoginResponse> {
    const { email, password } = registerDto;
    await this.checkUserExists(email);
    try {
      const hashedPassword = await this.hashPassword(password);
      const user = await this.userService.create({
        ...registerDto,
        role: UserRole.STUDENT,
        password: hashedPassword,
      });
      const { studentId } = await this.studentService.create({ ...registerDto, user })
      const { id, role, email, fullname, tokenVersion, profilePicture } = user;
      const tokens = this.authService.assignTokens({ userId: id, role, email, fullname, tokenVersion });
      return { ...tokens, fullname, email, role, profilePicture, studentId };
    } catch (error) {
      throw new BadRequestException('Failed to register user.');
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email: loginEmail, password: loginPassword } = loginUserDto;
    let existingUser: Omit<User, 'createdAt' | 'updatedAt'>;
    let isValid: boolean;

    try {
      existingUser = await this.userService.findUserWithPassword(loginEmail);
      isValid = await bcrypt.compare(loginPassword, existingUser.password);
    } catch (error) {
      throw new ForbiddenException('Username or password is invalid');
    }

    if (!isValid) {
      throw new ForbiddenException('Username or password is invalid');
    }

    const { id, role, profilePicture, tokenVersion, email, fullname } = existingUser;
    let companyName = null;
    let advisorId = null;
    let studentId = null;
    switch (role) {
      case "STUDENT":
        studentId = (await this.studentService.findOneByUserId(id)).studentId;
        break;
      case "ADVISOR":
        advisorId = (await this.advisorService.findOneByUserId(id)).employeeId;
        break;
      case "COMPANY":
        companyName = (await this.companyService.findOneByUserId(id)).name;
        break;
    }
    const tokens = this.authService.assignTokens({ userId: id, email, fullname, role, tokenVersion });
    return { ...tokens, fullname, email, role, profilePicture, advisorId, companyName, studentId };
  }

  @Post('refresh-token')
  async getTokens(@Req() req): Promise<LoginResponse> {
    const token = req.cookies['refreshToken'];

    try {
      const {
        accessToken,
        refreshToken,
        user,
      } = await this.authService.refreshTokens(token);
      if (accessToken && user) {
        return { accessToken, refreshToken, ...user };
      }
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
