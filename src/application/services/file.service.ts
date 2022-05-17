import { Injectable } from '@nestjs/common';
import { StorageAdapter } from './protocols/storage.adapter';

@Injectable()
export class FileService {
  constructor(private storage: StorageAdapter) {}
  async addPhoto(filename: string, file: Express.Multer.File): Promise<string> {
    return await this.storage.save(file, {
      filename,
    });
  }
}
