import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/shared/enums/user-role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...args: UserRole[]) => SetMetadata(ROLES_KEY, args);
