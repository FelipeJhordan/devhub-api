import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';

import chalk from 'chalk';
import { ConfigService } from '@nestjs/config';

import { MiddlewaresComposite } from './application/middlewares/middlewares.composite';
import { AppModule } from '@/application/ioc/app.module';
import { HttpExceptionFilter } from './infra/rest/http-exception.filter';
import { LoggingInterceptor } from './infra/rest/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    app.setGlobalPrefix('api/v1', {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });

    const config = new DocumentBuilder().setTitle('DevHub').setVersion('1.0').build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.useGlobalInterceptors(new LoggingInterceptor());

    const configService = app.get(ConfigService);

    const port = configService.get('PORT');

    new MiddlewaresComposite().apply(app.use);

    await app.listen(port);

    Logger.log(`🚀 Server is listening on port ${chalk.hex('#aabbff').bold(`${port}`)}`);
  } catch (e) {
    Logger.error('🛑 Error to the starting server, ' + e, 'Bootstrap');
    process.exit();
  }
}
bootstrap();
