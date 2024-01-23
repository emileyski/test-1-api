import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of a task',
    example: 'Task 1',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of a task',
    example: 'This is a description',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description?: string;
}
