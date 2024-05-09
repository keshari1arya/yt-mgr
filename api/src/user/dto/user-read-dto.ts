import { AutoMap } from '@automapper/classes';
import { IsString, MinLength, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserReadDto {
  @ApiProperty()
  @IsString()
  @AutoMap()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @AutoMap()
  phone: string;

  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  @AutoMap()
  role: UserRole;
}
