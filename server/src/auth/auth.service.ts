import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('🚀 ~ AuthService ~ validateUser ~ user:', user);
    console.log(
      '🚀 ~ AuthService ~ validateUser ~ password:',
      await bcrypt.compare(password, user.password),
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      console.log('🚀 ~ AuthService ~ validateUser ~ result:', result);
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('🚀 ~ AuthService ~ login ~ user:', user);
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
