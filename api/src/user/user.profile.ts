import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { User } from './entities/user.entity';
import { Mapper, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserReadDto } from './dto/user-read-dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, RegisterUserDto, User);
      createMap(mapper, User, UserReadDto);
    };
  }
}
