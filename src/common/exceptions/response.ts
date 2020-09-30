import { v4 as uuidv4 } from 'uuid'
import * as ip from 'ip'
import * as os from 'os'
import { IExceptionRecord } from './exception'

export interface IExceptionResponse extends IExceptionRecord {
  actionType: 'command' | 'query'
  path: string
  userId?: string
}

export class ExceptionResponse {
  constructor({
    module,
    type,
    actionType,
    path,
    codes = [],
    userId,
  }: IExceptionResponse) {
    this.id = uuidv4()
    this.ip = ip.address()
    this.host = os.hostname()
    this.system = 'hero-backend'
    this.module = module
    this.type = type
    this.actionType = actionType
    this.path = path
    this.codes = codes
    this.userId = userId
    this.timestamp = new Date()
  }

  id: string

  ip: string

  host: string

  system: string

  module: IExceptionResponse['module']

  type: IExceptionResponse['type']

  actionType: IExceptionResponse['actionType']

  path?: IExceptionResponse['path']

  codes: IExceptionResponse['codes']

  userId?: IExceptionResponse['userId']

  timestamp: Date
}
