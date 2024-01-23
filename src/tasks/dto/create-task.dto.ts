import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of a task',
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    description: 'The description of a task',
    example: 'This is a description',
    required: false,
  })
  description?: string;
}
