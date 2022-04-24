export abstract class StorageAdapter {
  abstract save(password: string, options?: IOptions): Promise<any>;
  abstract getFile(path, options?: IOptions): Promise<any>;
}
