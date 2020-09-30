import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { ItemType } from "src/common/enums/item-type.enum";

import { IEvent } from "@nestjs/cqrs";
import { ItemRepository } from "../../domain/repositories/item.repository";

export class HeroCreatedEvent implements IEvent {
    constructor(public readonly heroId: string){}
}

@EventsHandler(HeroCreatedEvent)
export class HeroCreatedEventHandler implements IEventHandler<HeroCreatedEvent>{
    constructor(
        @InjectRepository(ItemRepository)
        private readonly itemRepository: ItemRepository
    ){}
    public async handle(event: HeroCreatedEvent){
        await this.itemRepository.save({
            heroId: event.heroId,
            type: ItemType.ARMOR
        })
        await this.itemRepository.save({
            heroId: event.heroId,
            type: ItemType.WEAPON
        })
    }
}