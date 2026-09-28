import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password credentials');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.usersService.findByEmail(registerDto.email);
    if (existing) {
      throw new UnauthorizedException('User with this email already exists');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      email: registerDto.email,
      name: registerDto.name,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const payload = { email: newUser.email, sub: newUser.id, role: newUser.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: newUser,
    };
  }
}
