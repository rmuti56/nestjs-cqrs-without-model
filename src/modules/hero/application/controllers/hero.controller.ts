import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Hero } from '../../domain/models/hero.model';

import { CreateHeroDto } from '../dto/create-hero.dto';
import { CreateHeroCommand } from '../commands/create-hero.command';
import { GetHeroByIdQuery } from '../queries/get-hero-by-id.query';
import { UpdateHeroDto } from '../dto/update-hero.dto';
import { UpdateHeroCommand } from '../commands/update-hero.command';

@ApiTags('hero')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('hero')
export class HeroController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createHero(@Body() createHeroDto: CreateHeroDto): Promise<Hero> {
    return await this.commandBus.execute(new CreateHeroCommand(createHeroDto));
  }

  @Put(':heroId')
  async updateHero(
    @Body() updateHeroDto: UpdateHeroDto,
    @Param('heroId') heroId: string,
  ): Promise<Hero> {
    updateHeroDto.id = heroId;
    return await this.commandBus.execute(new UpdateHeroCommand(updateHeroDto));
  }

  //query
  @Get()
  async getHeroById(@Param('id') id: string): Promise<Hero> {
    return await this.queryBus.execute(new GetHeroByIdQuery(id));
  }
}
