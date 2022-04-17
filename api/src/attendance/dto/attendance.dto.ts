import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: Date })
    date: string;
    @ApiProperty({ type: Boolean })
    absent: boolean;
}