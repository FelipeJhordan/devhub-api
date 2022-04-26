import { Module } from '@nestjs/common';
import { FileService } from '../services/file.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FileService],
})
export class FileModule {}
