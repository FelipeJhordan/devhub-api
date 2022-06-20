import { Injectable } from '@nestjs/common';
import { MailAdapter } from './protocols/mail.adapter';

@Injectable()
export class EmailService {
  constructor(public emailAdapter: MailAdapter) {}
}
