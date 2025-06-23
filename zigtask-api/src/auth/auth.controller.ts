import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { SigninResponseDto } from './dto/signin-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthDto): Promise<SignupResponseDto> {
    return this.authService.signUp(dto.email, dto.password);
  }

  @Post('signin')
  async signIn(@Body() dto: AuthDto): Promise<SigninResponseDto> {
    return this.authService.signIn(dto.email, dto.password);
  }
}
