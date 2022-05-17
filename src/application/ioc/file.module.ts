import { S3AdapterImp } from '@/infra/storage/s3/s3.adapter.imp';
import { Module } from '@nestjs/common';
import { FileService } from '../services/file.service';
import { StorageAdapter } from '../services/protocols/storage.adapter';

@Module({
  imports: [],
  controllers: [],
  providers: [
    FileService,
    {
      provide: StorageAdapter,
      useClass: S3AdapterImp,
    },
  ],
  exports: [FileService],
})
export class FileModule {}
