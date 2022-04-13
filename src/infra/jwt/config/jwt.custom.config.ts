import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtCustomConfig implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
    const SECRET: string = this.configService.get('JWT_SECRET');
    return {
      secret: SECRET,
      signOptions: {
        expiresIn: '2d',
      },
    };
  }
}
