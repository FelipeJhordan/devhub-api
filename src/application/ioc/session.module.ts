import { Module } from '@nestjs/common';
import { SessionService } from '../services/session.service';

@Module({
  imports: [],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
