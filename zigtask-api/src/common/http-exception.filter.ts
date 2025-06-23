import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseDto } from './dto/response.dto';

type ExceptionResponse = { message?: string; error?: string };

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType: string | undefined = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object' && res !== null) {
        const resp = res as ExceptionResponse;
        message = resp.message || message;
        errorType = resp.error || errorType;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorType = exception.name;
    }

    console.error(
      `[${request.method}] ${request.url} ${status} - ${message}`,
      exception instanceof Error ? exception.stack : exception,
    );

    const errorResponse: ResponseDto<null> = {
      data: null,
      message,
      statusCode: status,
      error: errorType,
    };

    response.status(status).json(errorResponse);
  }
}
