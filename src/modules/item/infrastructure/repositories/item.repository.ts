import { EntityRepository, Repository } from "typeorm";
import { ItemEntity } from "../entities/item.entity";

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity>{
    
}