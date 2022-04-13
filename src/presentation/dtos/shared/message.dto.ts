export class MessageDto {
  status: number;
  message: string;

  static createMessage(message, status = 200): MessageDto {
    return {
      message,
      status,
    };
  }
}
