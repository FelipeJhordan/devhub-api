import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/application/ioc/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
}
bootstrap();
