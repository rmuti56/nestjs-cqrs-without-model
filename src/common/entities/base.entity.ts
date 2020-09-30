import { AggregateRoot } from '@nestjs/cqrs';
import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class Base extends AggregateRoot {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn({
      type: 'timestamp without time zone',
    })
    createDate: Date;
  
    @UpdateDateColumn({
      type: 'timestamp without time zone',
    })
    updateDate: Date;
  }
  