import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ExceptionResponse } from './protocols/IExceptionResponse';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { data, message } = <ExceptionResponse>exception.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      error: message,
      timestamp: new Date().toISOString(),
      data,
      path: request.url,
    });
  }
}
