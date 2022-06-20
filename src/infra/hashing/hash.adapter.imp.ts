import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { HashingAdapter } from '@/application/services/protocols/hashing.adapter';

@Injectable()
export class HashAdapterImp implements HashingAdapter {
  private SALT = 10;
  async hash(password, options): Promise<string> {
    try {
      return await bcrypt.hash(password, options?.salt || this.SALT);
    } catch (e) {
      throw new InternalServerErrorException('Error trying to hash the password.');
    }
  }
  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (e) {
      throw new InternalServerErrorException('Error trying to compare the given password with hashed password.');
    }
  }
}
