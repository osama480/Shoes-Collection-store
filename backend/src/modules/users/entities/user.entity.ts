import { Role } from '../../../common/enums/role.enum';

export class UserEntity {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
