import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [
    {
      id: 'usr_1',
      email: 'admin@solecollection.com',
      name: 'Admin User',
      role: Role.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'usr_2',
      email: 'customer@gmail.com',
      name: 'John Doe',
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  async findById(id: string): Promise<UserEntity> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findById(id);
    Object.assign(user, dto, { updatedAt: new Date() });
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }
}
