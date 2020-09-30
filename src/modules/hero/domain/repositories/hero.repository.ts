import { EntityRepository, Repository } from "typeorm";
import { Hero } from "../entities/hero.entity";

@EntityRepository(Hero)
export class HeroRepository extends Repository<Hero>{
    
}