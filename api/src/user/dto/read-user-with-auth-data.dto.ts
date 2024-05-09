import { AutoMap } from '@automapper/classes';
import { UserReadDto } from './user-read-dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserReadWithAuthDataDto extends UserReadDto {
  @AutoMap()
  @ApiProperty()
  password: string;

  @AutoMap()
  @ApiProperty()
  resetPasswordToken: string;
}
