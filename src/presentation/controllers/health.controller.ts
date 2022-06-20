import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { PrismaHealthIndicator } from '@/infra/terminus/prisma.health.indicator';

@Controller('health')
@ApiTags('Health Check')
export class HealthController {
  constructor(private health: HealthCheckService, private prisma: PrismaHealthIndicator) {}

  @Get()
  @HealthCheck()
  @ApiOperation({
    description: 'Check state of Database',
  })
  checkDatabase() {
    return this.health.check([() => this.prisma.isHealthy('database')]);
  }
}
