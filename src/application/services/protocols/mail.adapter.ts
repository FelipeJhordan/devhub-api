export abstract class MailAdapter {
  abstract send(email: string, options: IOptions): Promise<boolean>;
}
