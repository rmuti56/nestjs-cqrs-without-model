import { HttpException, HttpStatus } from '@nestjs/common'

export interface IExceptionRecord {
  httpStatus: number
  module?: string
  type: 'application' | 'validation' | 'domain' | 'infrastructure'
  codes: string[]
}

export class Exception extends HttpException {
  constructor(exceptionRecord: IExceptionRecord) {
    super(exceptionRecord, exceptionRecord.httpStatus)
  }
}
