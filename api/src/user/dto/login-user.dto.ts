import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsEmail()
  @AutoMap()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @AutoMap()
  @ApiProperty()
  password: string;
}
