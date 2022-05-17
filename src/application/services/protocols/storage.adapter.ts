export abstract class StorageAdapter {
  abstract save(file: Express.Multer.File, options?: IOptions): Promise<string>;
  // abstract getFile(path, options?: IOptions): Promise<any>;
}
