import { Module } from '@nestjs/common';
import { FileService } from '../services/file.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
