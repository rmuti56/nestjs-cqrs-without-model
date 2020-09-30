import { Inject } from '@nestjs/common';
import { HeroFactory } from '../../domain/models/hero.factory';
import { Hero } from '../../domain/models/hero.model';
import { HeroEntity } from '../entities/hero.entity';
export class HeroMapper {
  constructor(
    @Inject(HeroFactory)
    private readonly heroFactory: HeroFactory,
  ) {}

  public modelToEntity(model: Hero): HeroEntity {
    const {
      id,
      name,
      attack,
      defence,
      intelligence,
      energy,
    } = model.toAnemic();
    const entity = new HeroEntity();
    entity.id = id;
    entity.name = name;
    entity.attack = attack;
    entity.defence = defence;
    entity.intelligence = intelligence;
    entity.energy = energy;
    return entity;
  }

  public entityToModel(entity: HeroEntity): Hero {
    const { id, name, attack, defence, energy, intelligence } = entity;
    return this.heroFactory.reconstitute({
      id,
      name,
      attack,
      defence,
      energy,
      intelligence,
    });
  }
}
