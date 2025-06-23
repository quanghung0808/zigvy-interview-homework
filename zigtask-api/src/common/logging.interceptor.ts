import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next.handle().pipe(
      tap((responseBody: ResponseDto<any>) => {
        const res: Request = context.switchToHttp().getResponse();
        const statusCode = res.statusCode;
        const responseTime = Date.now() - now;
        const message = responseBody?.message || 'No message';

        console.log(
          `[${method}] ${url} ${statusCode} - ${responseTime}ms - Message: ${message}`,
        );
      }),
    );
  }
}
