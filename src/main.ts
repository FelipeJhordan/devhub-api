import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/application/ioc/app.module';
import { MiddlewaresComposite } from './application/middlewares/middlewares.composite';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT');

  new MiddlewaresComposite().apply(app.use);

  await app.listen(port);
}
bootstrap().catch((err) => console.log('Failed to start error' + err)); // Vou melhorar isso depois.
