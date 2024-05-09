import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class UserCreateDto {
  @IsString()
  @AutoMap()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsEmail()
  @AutoMap()
  @ApiProperty()
  @IsOptional()
  email: string;

  @IsEnum(UserRole)
  @AutoMap()
  @ApiProperty({ enum: UserRole })
  role: string;
}
