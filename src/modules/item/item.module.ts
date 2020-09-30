import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { eventHandlers } from './application/events';
import { ItemRepository } from './infrastructure/repositories/item.repository';

@Module({
    imports:[TypeOrmModule.forFeature([ItemRepository])],
    providers: [...eventHandlers]
})
export class ItemModule {}
