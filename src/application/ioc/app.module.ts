import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from './health.module';
import { PrismaModule } from './prisma.module';

import { AppController } from '@/presentation/controllers/app.controller';
import { AppService } from '@/application/services/app.service';
import { AuthModule } from './auth.module';
import { PostModule } from './post.module';
import { UserModule } from './user.module';
import { SessionModule } from './session.module';

@Module({
  imports: [
    HealthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    AuthModule,
    PostModule,
    UserModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
