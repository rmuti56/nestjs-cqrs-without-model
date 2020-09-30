import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as Filter,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Exception, IExceptionRecord } from '../exceptions/exception';
import { ExceptionResponse } from '../exceptions/response';

@Catch(Exception)
export class ExceptionFilter implements Filter {
  getActionType(method: string) {
    return method === 'get' ? 'query' : 'command';
  }

  catch(exception: Exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { user, method, url } = request;
    const {
      module,
      type,
      codes,
      httpStatus,
    } = exception.getResponse() as IExceptionRecord;
    

    const exceptionResponse = new ExceptionResponse({
      httpStatus,
      module,
      type,
      actionType: this.getActionType(method),
      path: url,
      codes: codes ? codes : [],
      userId: user ? user.id : null,
      
    });
   
   
    response.status(httpStatus).json(classToPlain(exceptionResponse));

  }
}
