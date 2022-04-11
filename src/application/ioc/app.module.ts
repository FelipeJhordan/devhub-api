import { Module } from '@nestjs/common';
import { AppService } from '@/application/services/app.service';
import { AppController } from '@/presentation/controllers/app.controller';
import { HealthModule } from './health.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { PostModule } from './post.module';

@Module({
  imports: [HealthModule, PrismaModule, AuthModule, PostModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
