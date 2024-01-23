import { ApiProperty } from '@nestjs/swagger';
import { TaskStatusEnum } from 'src/core/enums';

export class SetTaskStatusDto {
  @ApiProperty({
    description: 'The status of a task',
    example: TaskStatusEnum.IN_PROGRESS,
  })
  status: TaskStatusEnum;
}
