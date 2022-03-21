import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/application/ioc/app.module';
import { MiddlewaresComposite } from './application/middlewares/middlewares.composite';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  new MiddlewaresComposite().apply(app.use);

  await app.listen(3333);
}
bootstrap();
