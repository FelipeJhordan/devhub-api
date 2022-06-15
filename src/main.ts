import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import chalk from 'chalk';
import { useContainer } from 'class-validator';

import { AppModule } from '@/application/ioc/app.module';
import { MiddlewaresComposite } from './application/middlewares/middlewares.composite';
import { HttpExceptionFilter } from './infra/rest/http-exception.filter';
import { LoggingInterceptor } from './infra/rest/logging.interceptor';

const apiVersion = `api/${process.env.API_VERSION || 'v1'}`;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });

    app.setGlobalPrefix(apiVersion, {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });

    const config = new DocumentBuilder().setTitle('DevHub').addBearerAuth().setVersion(apiVersion).build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${apiVersion}/docs`, app, document);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
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
