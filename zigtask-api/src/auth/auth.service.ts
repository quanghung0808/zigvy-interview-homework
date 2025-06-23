import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { SignupResponseDto } from './dto/signup-response.dto';
import { SigninResponseDto } from './dto/signin-response.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async signUp(email: string, password: string): Promise<SignupResponseDto> {
    const existing = await this.usersService.findByEmail(email);
    if (existing) throw new ConflictException('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({ email, password: hash });
    return { id: String(user._id), email: user.email };
  }

  async signIn(email: string, password: string): Promise<SigninResponseDto> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user._id, email: user.email };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = randomBytes(64).toString('hex');
    await this.userModel.updateOne(
      { _id: user._id },
      { refreshToken: refresh_token },
    );
    return {
      access_token,
      refresh_token,
      user: { id: String(user._id), email: user.email },
    };
  }
}
