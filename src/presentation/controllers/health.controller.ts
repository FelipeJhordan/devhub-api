import { PrismaHealthIndicator } from '@/infra/terminus/prisma.health.indicator';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private health: HealthCheckService, private prisma: PrismaHealthIndicator) {}

  @Get()
  @HealthCheck()
  checkDatabase() {
    return this.health.check([() => this.prisma.isHealthy('database')]);
  }
}
