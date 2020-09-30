import { AggregateRoot, IEvent } from '@nestjs/cqrs';

export interface AnemicHero {
  readonly id: string;
  readonly name: string;
  readonly attack: number;
  readonly defence: number;
  readonly energy: number;
  readonly intelligence: number;
}

export class Hero extends AggregateRoot {
  public events: IEvent[] = [];
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly attack: number,
    private readonly defence: number,
    private readonly energy: number,
    private readonly intelligence: number,
  ) {
    super();
  }

  public toAnemic(): AnemicHero{
      return {
          id: this.id,
          name: this.name,
          attack: this.attack,
          defence: this.defence,
          energy: this.energy,
          intelligence: this.intelligence
      }
  }

  private updateHeroGuard(): void {
      // domain validation
  }

  public updateHero(): void {
    this.updateHeroGuard();
  }
}
