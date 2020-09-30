import { Base } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({name: 'hero'})
export class HeroEntity extends Base {
  @Column()
  name: string;

  @Column({
      type:'numeric'
  })
  attack: number;

  @Column({
    type:'numeric'
  })
  defence: number;

  @Column({
    type:'numeric'
  })
  energy: number;

  @Column({
    type:'numeric'
  })
  intelligence: number;
}
