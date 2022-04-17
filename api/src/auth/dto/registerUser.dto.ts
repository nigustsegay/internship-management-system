import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({ type: String })
  fullname: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  password: string;
}

export type RegisterDto = Omit<RegisterUserDto, "role">;

export class RegisterStudentDto extends RegisterUserDto {
  @ApiProperty({ type: String })
  studentId: string;
  @ApiProperty({ type: String })
  department: string;
}

export class RegisterAdvisorDto extends RegisterUserDto {
  @ApiProperty({ type: String })
  employeeId: string;
  @ApiProperty({ type: String })
  department: string;
}

export class RegisterCompanyDto extends RegisterUserDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  logo: string;
  @ApiProperty({ type: String })
  description: string;
}
