import { PrismaHealthIndicator } from '@/infra/terminus/prisma.health.indicator';
import { HealthController } from '@/presentation/controllers/health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaHealthIndicator],
})
export class HealthModule {}
