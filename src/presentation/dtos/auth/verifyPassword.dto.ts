import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
