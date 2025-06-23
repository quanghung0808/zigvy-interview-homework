import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;
}

export class SigninResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
