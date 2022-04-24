export abstract class HashingAdapter {
  abstract hash(password: string, options?: IOptions): Promise<string>;
  abstract compare(password: string, hashedPassword: string): Promise<boolean>;
}
