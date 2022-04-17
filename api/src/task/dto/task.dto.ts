import { ApiProperty } from '@nestjs/swagger';
export class CreateTaskDto {
    @ApiProperty({ type: String })
    studentId: string;
    @ApiProperty({ type: String })
    name: string;
    @ApiProperty({ type: String })
    description?: string;
}

export class MarkTaskDto {
    @ApiProperty({ type: String })
    taskId: string;
}