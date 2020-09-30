/* eslint-disable @typescript-eslint/ban-types */
import { PipeTransform, Injectable, ArgumentMetadata, HttpStatus } from '@nestjs/common'
import { validate, ValidationError } from 'class-validator'
import { plainToClass } from 'class-transformer'

import { Exception } from '../exceptions/exception'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  getCodes(validationErrors: ValidationError[]) {
    return validationErrors
      .reduce((prev, current) => {
        const errorKey = current.constraints
          ? Object.values(current.constraints)
          : this.getCodes(current.children)
        return [...prev, errorKey]
      }, [])
      .flat(Infinity)
      
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      const codes = this.getCodes(errors)
      throw new Exception({ type: 'validation', codes,httpStatus: HttpStatus.UNPROCESSABLE_ENTITY })
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
