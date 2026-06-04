import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/jwt/jwt.constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
     JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: { expiresIn: '20h' },
    }),
  ],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
