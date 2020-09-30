import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateHeroDto } from '../../interface/dto/create-hero.dto';
import { CreateHeroCommand } from '../commands/create-hero.command';


@ApiTags('hero')
@Controller('hero')
export class HeroController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createHero(@Body() createHeroDto: CreateHeroDto) : Promise<CreateHeroDto> {
    return await this.commandBus.execute(new CreateHeroCommand(createHeroDto));
  }
}
