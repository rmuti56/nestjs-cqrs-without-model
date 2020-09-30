import { Module } from '@nestjs/common';
import { CqrsModule } from './cqrs/cqrs.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HeroModule } from './modules/hero/hero.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [CqrsModule, ConfigModule, DatabaseModule, HeroModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
