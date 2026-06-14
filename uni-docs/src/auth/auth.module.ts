import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: '4890df1d99187b8576f9df3fa138a41a6743e81e5665889da631cfdc069a47a26190037183645f58b3af8bfa31a7809194a101308cc9f853d08336c9e0ef0bd',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
