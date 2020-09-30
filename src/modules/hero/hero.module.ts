import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './application/commands';
import { HeroController } from './application/controllers/hero.controller';
import { QueryHandlers } from './application/queries';
import { HeroRepository } from './infrastructure/repositories/hero.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HeroRepository])],
  controllers: [HeroController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class HeroModule {}
