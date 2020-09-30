import { Base } from "src/common/entities/base.entity";
import { ItemType } from "src/common/enums/item-type.enum";
import { Column, Entity } from "typeorm";

@Entity({name: 'item'})
export class ItemEntity extends Base {
    @Column({type:'uuid'})
    heroId: string

    @Column()
    type: ItemType
}