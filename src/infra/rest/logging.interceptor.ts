import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import chalk from 'chalk';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const parentType = chalk.hex('#87e8de').bold(`${context.getArgs()[0].route.path}`);
    const fieldName = chalk.hex('#87e8de').bold(`${context.getArgs()[0].route.stack[0].method}`);
    return next.handle().pipe(
      tap(() => {
        Logger.debug(`${fieldName} » ${parentType}`, 'Restful');
      }),
    );
  }
}
