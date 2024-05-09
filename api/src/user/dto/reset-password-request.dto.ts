import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  newPassword: string;

  @IsString()
  @ApiProperty()
  resetPasswordToken: string;
}
