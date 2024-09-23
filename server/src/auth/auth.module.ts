import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        '5958e32a926227d44b3c1a4c4a4ff8431d1c1ea2769ae26d5682ba27e94832c1bdeb51befe1a6aae22b981d0c358a7ef8494ff01bd4ebd6d5a5811cdfb224cb2',
      secretOrPrivateKey:
        '5958e32a926227d44b3c1a4c4a4ff8431d1c1ea2769ae26d5682ba27e94832c1bdeb51befe1a6aae22b981d0c358a7ef8494ff01bd4ebd6d5a5811cdfb224cb2',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
