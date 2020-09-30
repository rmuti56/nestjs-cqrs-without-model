import { AnemicHero, Hero } from './hero.model';

export class HeroFactory {
  public reconstitute(anemic: AnemicHero): Hero {
    const { id, defence, attack, energy, intelligence, name } = anemic;
    return new Hero(id, name, attack, defence, energy, intelligence);
  }
}
