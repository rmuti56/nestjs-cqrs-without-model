import { Inject } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

import { Hero } from '../../domain/models/hero.model';
import { HeroEntity } from '../entities/hero.entity';
import { HeroMapper } from '../mappers/hero.mapper';

@EntityRepository(HeroEntity)
export class HeroRepository extends Repository<HeroEntity> {
  constructor(@Inject(HeroMapper) private readonly heroMapper: HeroMapper) {
    super();
  }

  public newId = async (): Promise<string> => {
    const entity = await this.save(new HeroEntity());
    return entity.id;
  };

  public saveFromModel = async (data: Hero | Hero[]): Promise<void> => {
    const models = Array.isArray(data) ? data : [data];
    const entities = models.map(model => this.heroMapper.modelToEntity(model));
    await this.save(entities);
  };

  public findModelById = async (id: string): Promise<Hero | undefined> => {
    const entity = await this.findOne({ id });
    return entity ? this.heroMapper.entityToModel(entity) : undefined;
  };
}
