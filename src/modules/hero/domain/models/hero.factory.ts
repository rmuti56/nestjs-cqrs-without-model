import { HeroCreatedEvent } from 'src/modules/item/application/events/hero-created.event';
import { CreateHeroDto } from '../../interface/dto/create-hero.dto';
import { AnemicHero, Hero } from './hero.model';

export class HeroFactory {

  public create(id: string,createHeroDto: CreateHeroDto){
    const {name,defence,energy,intelligence,attack} = createHeroDto
    const hero = new Hero(
      id,
      name,
      attack,
      defence,
      energy,
      intelligence
    )
    // hero.apply(new HeroCreatedEvent(id))
     hero.events.push(new HeroCreatedEvent(id))
    return hero
  }

  public reconstitute(anemic: AnemicHero): Hero {
    const { id, defence, attack, energy, intelligence, name } = anemic;
    return new Hero(id, name, attack, defence, energy, intelligence);
  }
}
