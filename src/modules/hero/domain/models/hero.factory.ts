import { HeroCreatedEvent } from 'src/modules/item/application/events/hero-created.event';
import { v4 as uuidv4 } from 'uuid';
import { ICreateHeroCommand } from '../../application/commands/create-hero.command';
import { Hero } from './hero.model';

export class HeroFactory {
  public create(createHeroCommand: ICreateHeroCommand) {
    const { name, attack, defence, energy, intelligence } = createHeroCommand;
    const newId = uuidv4()
    const hero = new Hero(newId, name, intelligence, defence, attack, energy);
    hero.events.push(new HeroCreatedEvent(newId))
    return hero;
  }
}
