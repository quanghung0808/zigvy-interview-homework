import { ApiProperty } from '@nestjs/swagger';

export class SignupResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}
