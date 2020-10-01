import { EntityRepository,Repository } from 'typeorm';
import { Hero } from '../models/hero.model';


@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero> {
  
}
