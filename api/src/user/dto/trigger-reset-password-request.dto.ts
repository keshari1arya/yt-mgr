import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class TriggerResetPasswordRequestDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
