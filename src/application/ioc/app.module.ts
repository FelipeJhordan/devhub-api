import { Module } from '@nestjs/common';
import { AppService } from '@/application/services/app.service';
import { AppController } from '@/presentation/controllers/app.controller';
import { HealthModule } from './health.module';
import { PrismaModule } from './prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HealthModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
