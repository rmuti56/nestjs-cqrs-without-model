import { EntityRepository, Repository } from "typeorm";
import { ItemEntity } from "../models/item.model";

@EntityRepository(ItemEntity)
export class ItemRepository extends Repository<ItemEntity>{
    
}