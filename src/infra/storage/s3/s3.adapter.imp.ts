import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { S3 } from 'aws-sdk';

import { StorageAdapter } from '@/application/services/protocols/storage.adapter';

@Injectable()
export class S3AdapterImp implements StorageAdapter {
  private accessKeyId: string;
  private secretAccessKey: string;
  private s3: S3;
  private bucket: string;
  constructor(private configService: ConfigService) {
    this.accessKeyId = this.configService.get('AWS_ACCESS_KEY');
    this.secretAccessKey = this.configService.get('AWS_KEY_SECRET');
    this.bucket = this.configService.get('AWS_BUCKET');

    this.s3 = new AWS.S3({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
    });
  }
  async save(file: Express.Multer.File, options?: IOptions): Promise<string> {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.bucket,
        Body: file.buffer,
        Key: (options.filename + '.') as string,
        ContentType: file.mimetype,
        ACL: 'public-read',
      })
      .promise();

    return uploadResult.Location;
  }
}
