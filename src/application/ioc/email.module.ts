import { SesAdapterImp } from '@/infra/email/ses/ses.adapter.imp';
import { Module } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { MailAdapter } from '../services/protocols/mail.adapter';

@Module({
  providers: [
    EmailService,
    {
      provide: MailAdapter,
      useClass: SesAdapterImp,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
