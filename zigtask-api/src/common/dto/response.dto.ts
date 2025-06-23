import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  data: T;

  @ApiProperty({ example: 'Success' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiPropertyOptional({ example: 'Bad Request' })
  error?: string;
}
