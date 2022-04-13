type Options = {
  [key: string]: string | boolean;
};

export abstract class HashingAdapter {
  abstract hash(password: string, options?: Options): Promise<string>;
  abstract compare(password: string, hashedPassword: string): Promise<boolean>;
}
