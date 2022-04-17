import { ApiProperty } from '@nestjs/swagger';

export class InternshipApplyDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    documentOfIntent: string;
}

export class AssignCompanyDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    companyName: string;
}

export class AssignAdvisorDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    advisorId: string;
}