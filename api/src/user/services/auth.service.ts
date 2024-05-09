import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserReadWithAuthDataDto } from 'src/user/dto/read-user-with-auth-data.dto';
import { ResetPasswordRequestDto } from '../dto/reset-password-request.dto';
import { UserReadDto } from '../dto/user-read-dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getToken(
    user: UserReadWithAuthDataDto,
    password: string,
  ): Promise<string> {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createToken(user);
  }

  async createToken(user: UserReadWithAuthDataDto) {
    const payload = { sub: user.email, username: user.name, role: user.role };

    return await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async createResetPasswordToken(user: UserReadDto): Promise<string> {
    const resetPasswordToken = await this.jwtService.signAsync(
      { email: user.email, name: user.name },
      {
        expiresIn: this.configService.get('PASSWORD_RESET_EXPIRATION_TIME'),
        secret: this.configService.get('JWT_SECRET'),
      },
    );
    return resetPasswordToken;
  }

  async validateResetPasswordToken(
    request: ResetPasswordRequestDto,
  ): Promise<boolean> {
    const isValidToken = await this.jwtService.verify(
      request.resetPasswordToken,
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    return isValidToken;
  }
}
