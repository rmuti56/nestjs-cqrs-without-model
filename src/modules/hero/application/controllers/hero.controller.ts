import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Hero } from '../../domain/entities/hero.entity';

import { CreateHeroDto } from '../../interface/dto/create-hero.dto';
import { CreateHeroCommand } from '../commands/create-hero.command';
import { GetHeroByIdQuery } from '../queries/get-hero-by-id.query';


@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createHero(@Body() createHeroDto: CreateHeroDto) : Promise<Hero> {
    return await this.commandBus.execute(new CreateHeroCommand(createHeroDto));
  }

  //query
  @Get()
  async getHeroById(@Param('id') id: string):Promise<Hero>{
    return await this.queryBus.execute(new GetHeroByIdQuery(id))
  }
}
