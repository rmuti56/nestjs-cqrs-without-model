import { IQueryHandler, QueryHandler, IQuery } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';

import { HeroRepository } from '../../domain/repositories/hero.repository';
import { Hero } from '../../domain/entities/hero.entity';

export class GetHeroByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetHeroByIdQuery)
export  class GetHeroByIdQueryHandler
  implements IQueryHandler<GetHeroByIdQuery> {
  constructor(
    @InjectRepository(HeroRepository)
    private readonly heroRepository: HeroRepository,
  ) {}

  public async execute(query: GetHeroByIdQuery): Promise<Hero | undefined> {
    const { id } = query;
    return await this.heroRepository.findOne(id);
  }
}
