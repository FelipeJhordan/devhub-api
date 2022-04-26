import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async addPhoto(filename: string, file: Express.Multer.File): Promise<string> {
    return await 'eai';
  }
}
