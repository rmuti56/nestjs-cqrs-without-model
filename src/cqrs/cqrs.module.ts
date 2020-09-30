import { Global, Module } from '@nestjs/common';
import { CqrsModule as Cqrs } from '@nestjs/cqrs';

@Global()
@Module({
  imports: [Cqrs],
  exports: [Cqrs],
})
export class CqrsModule {}
