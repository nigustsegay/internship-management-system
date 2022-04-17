import { ApiProperty } from '@nestjs/swagger';
export class RequestDto {
    @ApiProperty({ type: String })
    companyName: string;
    @ApiProperty({ type: String })
    department: string;
    @ApiProperty({ type: Number })
    quantity: number;
}

export class RequestAcceptDto {
    @ApiProperty({ type: String })
    requestId: string;
}
export class RequestRejectDto extends RequestAcceptDto { }