import { EntityRepository, Repository } from "typeorm";
import { HeroEntity } from "../entities/hero.entity";

@EntityRepository(HeroEntity)
export class HeroRepository extends Repository<HeroEntity>{
    
}