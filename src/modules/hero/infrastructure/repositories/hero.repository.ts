import { EntityRepository, getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { HeroFactory } from '../../domain/models/hero.factory';


import { Hero } from '../../domain/models/hero.model';
import { HeroEntity } from '../entities/hero.entity';


@EntityRepository(HeroEntity)
export class HeroRepository extends Repository<HeroEntity> {
  
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
    const heroFactory = new HeroFactory()
    return heroFactory.reconstitute({
      id,
      name,
      attack,
      defence,
      energy,
      intelligence,
    });
  }

  public newId(): string {
    return uuidv4();
  }

  public async saveFromModel(hero: Hero): Promise<HeroEntity> {
    const entity = this.modelToEntity(hero);
    return await getRepository(HeroEntity).save(entity);
  }

  public async saveFromModels(models: Hero[]): Promise<HeroEntity[]> {
    const entities = models.map(model => this.modelToEntity(model));
    return await getRepository(HeroEntity).save(entities);
  }

  public async findModelById(id: string): Promise<Hero | undefined> {
    const entity = await getRepository(HeroEntity).findOne({ id });
    return entity ? this.entityToModel(entity) : undefined;
  }

  public async findById(id: string): Promise<HeroEntity | undefined> {
    return await getRepository(HeroEntity).findOne({ id });
  }
}
