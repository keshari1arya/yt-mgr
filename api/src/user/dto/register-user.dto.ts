import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsEmail,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  @AutoMap()
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @AutoMap()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsEmail()
  @AutoMap()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(10)
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  phone: string;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  dealerId: number;
}
