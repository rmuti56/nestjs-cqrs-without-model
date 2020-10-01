import { Base } from "src/common/models/base.model";
import { ItemType } from "src/common/enums/item-type.enum";
import { Column, Entity } from "typeorm";

@Entity({name: 'item'})
export class ItemEntity extends Base {
    @Column({type:'uuid'})
    heroId: string

    @Column()
    type: ItemType
}