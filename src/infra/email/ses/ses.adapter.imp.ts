import { MailAdapter } from '@/application/services/protocols/mail.adapter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { SES } from 'aws-sdk';
import fs from 'fs/promises';

import { handlebars } from 'hbs';
import path from 'path';

@Injectable()
export class SesAdapterImp implements MailAdapter {
  private accessKeyId: string;
  private secretAccessKey: string;
  private ses: SES;
  private sendEmailSource = '<contato@fjalves.tech>';
  constructor(private configService: ConfigService) {
    this.accessKeyId = this.configService.get('AWS_ACCESS_KEY');
    this.secretAccessKey = this.configService.get('AWS_KEY_SECRET');

    this.ses = new AWS.SES({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: 'sa-east-1',
    });
  }
  async send(email: string, options: IOptions): Promise<boolean> {
    const template = await this.getTemplateSource();
    const params = {
      Source: this.sendEmailSource,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: handlebars.compile(template)(options),
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Código de recuperação Devhub ${options.name}`,
        },
      },
    };
    await this.ses.sendEmail(params).promise();

    return true;
  }

  private async getTemplateSource() {
    return fs.readFile(
      path.resolve(__dirname, '..', '..', '..', '..', '..', 'public', 'templates', 'sendRecoveryEmail.hbs'),
      'utf8',
    );
  }
}
