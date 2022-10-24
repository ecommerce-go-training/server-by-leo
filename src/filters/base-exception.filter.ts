/* eslint-disable no-console */
import { Catch, HttpStatus } from '@nestjs/common';

import type { Response } from 'express';
import type { HttpException } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';

import { BaseException } from '@/exceptions';
import { Exception } from '@/utils/constants';
import { isDevelopmentEnv } from '@/utils/helpers';

import type { IBaseExceptionResponse } from '@/exceptions';

@Catch()
export class AdvancedExceptionFilter implements ExceptionFilter {
  catch(
    exception: HttpException,
    host: ArgumentsHost,
  ): Response<IBaseExceptionResponse> {
    const isDevelopment = isDevelopmentEnv();
    const response = host.switchToHttp().getResponse<Response>();

    let data = <IBaseExceptionResponse>{
      code: Exception.INTERNAL_ERROR_CODE,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Something went wrong!',
    };

    try {
      const status =
        exception?.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof BaseException) {
        const { code, message } = exception;

        data = {
          code,
          status,
          message,
        };
      } else {
        const { name, message } = exception;
        console.log(
          '🚀 ~ file: base-exception.filter.ts ~ line 43 ~ AdvancedExceptionFilter ~ name, message',
          name,
          message,
        );
        console.log(
          '🚀 ~ file: base-exception.filter.ts ~ line 43 ~ AdvancedExceptionFilter ~ exception',
          exception,
        );

        switch (name) {
          case 'ForbiddenException': {
            data = {
              code: Exception.FORBIDDEN_CODE,
              status,
              message: 'You are unauthorized to use this resource.',
            };

            break;
          }
          case 'UnauthorizedException': {
            data = {
              code: Exception.UNAUTHORIZED_CODE,
              status,
              message: 'You are unauthorized.',
            };

            break;
          }

          case 'BadRequestException': {
            data = {
              code: Exception.BAD_REQUEST_CODE,
              status,
              message,
            };

            break;
          }

          case 'NotFoundException': {
            data = {
              code: Exception.NOT_FOUND_CODE,
              status,
              message: 'The resource can not be found.',
            };

            break;
          }
          default: {
            data = {
              code: Exception.BAD_REQUEST_CODE,
              status,
              message,
            };

            if (isDevelopment) {
              data.stack = exception?.cause?.stack;
              data.code = Exception.NOT_FOUND_CODE;

              console.log("Exception Filter's Exception: ");
              console.log(exception);
            }

            break;
          }
        }
      }

      return response.status(status).send(data);
    } catch (error) {
      if (isDevelopment) {
        data.stack = error?.stack;
        data.message = error?.message;
      }

      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(data);
    }
  }
}
