import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsNumber()
  @AutoMap()
  @ApiProperty()
  otp: number;

  @IsString()
  @AutoMap()
  @ApiProperty()
  mobile: string;
}
