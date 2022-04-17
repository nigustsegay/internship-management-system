import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    advisorId: string;
    @ApiProperty({ type: String })
    message: string;
    @ApiProperty({ type: Boolean })
    sentByAdvisor?: boolean;
}