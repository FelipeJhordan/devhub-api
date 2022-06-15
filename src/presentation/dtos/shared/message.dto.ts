import { ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  status: number;

  @ApiProperty()
  message: string;

  static createMessage(message, status = 200): MessageDto {
    return {
      message,
      status,
    };
  }
}
