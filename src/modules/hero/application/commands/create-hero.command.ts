import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { HeroRepository } from 'src/modules/hero/domain/repositories/hero.repository';
import { HeroCreatedEvent } from 'src/modules/item/application/events/hero-created.event';

interface ICreateHeroCommand {
  name: string;
  attack?: number;
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
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository,
  ) {}

  async execute({ data }: CreateHeroCommand) {
    const hero = await this.heroRepository.save(data);
    this.eventBus.publish(new HeroCreatedEvent(hero.id));
  }
}
