import { Inject } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { HeroRepository } from 'src/modules/hero/domain/repositories/hero.repository';
import { HeroFactory } from '../../domain/models/hero.factory';

export interface ICreateHeroCommand {
  name: string;
  attack: number;
  defence: number;
  energy: number;
  intelligence: number;
}

export class CreateHeroCommand implements ICommand {
  constructor(public readonly data: ICreateHeroCommand) {}
}

@CommandHandler(CreateHeroCommand)
export class CreateHeroHandler implements ICommandHandler<CreateHeroCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @Inject(HeroFactory)
    private readonly heroFactory: HeroFactory,
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository,
  ) {}

  async execute({ data }: CreateHeroCommand) {
    const hero = this.heroFactory.create(data);

    const newHero = await this.heroRepository.save(hero);
  
    hero.events.forEach(event => {
      this.eventBus.publish(event);
    });

    return newHero;
  }
}
