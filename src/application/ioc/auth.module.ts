import { HashAdapterImp } from '@/infra/hashing/hash.adapter.imp';
import { JwtCustomConfig } from '@/infra/jwt/config/jwt.custom.config';
import { JwtStrategy } from '@/infra/passport/jwt-strategy/jwt.strategy';
import { AuthController } from '@/presentation/controllers/auth.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { HashingAdapter } from '../services/protocols/hashing.adapter';
import { EmailModule } from './email.module';
import { SessionModule } from './session.module';
import { UserModule } from './user.module';
@Module({
  imports: [
    UserModule,
    SessionModule,
    JwtModule.registerAsync({ imports: [ConfigModule], useClass: JwtCustomConfig }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [
    PassportModule,
    AuthService,
    {
      provide: HashingAdapter,
      useClass: HashAdapterImp,
    },
    JwtStrategy,
  ],
})
export class AuthModule {}
