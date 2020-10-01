import { HttpStatus } from '@nestjs/common';
import {
  CommandHandler,
  EventBus,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Exception } from 'src/common/exceptions/exception';
import { HeroRepository } from '../../domain/repositories/hero.repository';

export interface IUpdateHeroCommand {
  id: string;
  name: string;
  attack: number;
  defence: number;
  energy: number;
  intelligence: number;
}

export class UpdateHeroCommand implements ICommand {
  constructor(public readonly data: IUpdateHeroCommand) {}
}

@CommandHandler(UpdateHeroCommand)
export class UpdateHeroHandler implements ICommandHandler<UpdateHeroCommand> {
  constructor(
    private readonly eventBus: EventBus,
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository,
  ) {}

  async execute({ data }: UpdateHeroCommand) {
    const { id } = data;
    const hero = await this.heroRepository.findOne(id);

    if (!hero) {
      throw new Exception({
        type: 'domain',
        codes: ['hero_not_found'],
        module: 'hero',
        httpStatus: HttpStatus.BAD_REQUEST,
      });
    }
    hero.update(data);

    hero.events.forEach(event => {
      this.eventBus.publish(event);
    });

    return await this.heroRepository.save(hero);
  }
}
