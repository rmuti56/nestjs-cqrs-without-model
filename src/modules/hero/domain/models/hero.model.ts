import { IEvent } from '@nestjs/cqrs';
import { Column, Entity } from 'typeorm';

import { Base } from 'src/common/models/base.model';
import { IUpdateHeroCommand } from '../../application/commands/update-hero.command';
import { Exclude } from 'class-transformer';
import { HeroCreatedEvent } from 'src/modules/item/application/events/hero-created.event';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity({ name: 'hero' })
export class Hero extends Base {
  @Column()
  name: string;

  @Column({
    type: 'numeric',
  })
  attack: number;

  @Column({
    type: 'numeric',
  })
  defence: number;

  @Column({
    type: 'numeric',
  })
  energy: number;

  @Column({
    type: 'numeric',
  })
  intelligence: number;

  @Exclude()
  @ApiHideProperty()
  events: IEvent[] = [];

  constructor(
    id: string,
    name: string,
    intelligence: number,
    defence: number,
    attack: number,
    energy: number,
  ) {
    super();
    this.id = id;
    this.intelligence = intelligence;
    this.defence = defence;
    this.attack = attack;
    this.energy = energy;
    this.name = name;
  }

  update(updateHeroCommand: IUpdateHeroCommand): void {
    this.name = updateHeroCommand.name;
    this.attack = updateHeroCommand.attack;
    this.defence = updateHeroCommand.defence;
    this.energy = updateHeroCommand.energy;
    this.intelligence = updateHeroCommand.intelligence;
    this.events.push(new HeroCreatedEvent(this.id))
  }
}
