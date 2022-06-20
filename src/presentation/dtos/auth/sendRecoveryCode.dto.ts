import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendRecoveryCodeDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
