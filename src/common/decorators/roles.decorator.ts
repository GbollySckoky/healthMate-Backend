import { UserRole } from '@/users/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

