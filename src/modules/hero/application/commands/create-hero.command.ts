import { Inject } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroRepository } from 'src/modules/hero/infrastructure/repositories/hero.repository';
import { HeroFactory } from '../../domain/models/hero.factory';

interface ICreateHeroCommand {
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
    private readonly eventPublisher: EventPublisher,
    @Inject(HeroFactory)
    private readonly heroFactory: HeroFactory,
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository,
  ) {}

  async execute({ data }: CreateHeroCommand) {
    const id = this.heroRepository.newId()
    const hero = this.heroFactory.create(id,data)
   
    hero.events.forEach(event=>{
      this.eventBus.publish(event)
    })
    
    return  await this.heroRepository.saveFromModel(hero)
  }
}
