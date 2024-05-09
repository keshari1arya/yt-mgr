import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserReadWithAuthDataDto } from 'src/user/dto/read-user-with-auth-data.dto';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { UserReadDto } from 'src/user/dto/user-read-dto';
import { UserUpdateDto } from 'src/user/dto/user-update.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserReadDto,
        forMember(
          (d) => d.role,
          mapFrom((s) => s.role),
        ),
      );
      createMap(
        mapper,
        User,
        UserCreateDto,
        forMember(
          (d) => d.role,
          mapFrom((s) => s.role),
        ),
      );
      createMap(
        mapper,
        User,
        UserUpdateDto,
        forMember(
          (d) => d.role,
          mapFrom((s) => s.role),
        ),
      );
      createMap(
        mapper,
        User,
        UserReadWithAuthDataDto,
        forMember(
          (d) => d.role,
          mapFrom((s) => s.role),
        ),
        forMember(
          (d) => d.resetPasswordToken,
          mapFrom((s) => s.resetPasswordToken),
        ),
      );
    };
  }
}
