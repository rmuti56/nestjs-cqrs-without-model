import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export class Base  {
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
  