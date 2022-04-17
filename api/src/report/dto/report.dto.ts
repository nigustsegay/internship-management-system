import { ApiProperty } from '@nestjs/swagger';
export class CreateReportDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    document: string;
}