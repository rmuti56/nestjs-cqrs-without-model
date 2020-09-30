import { Module } from '@nestjs/common';
import { CqrsModule } from './cqrs/cqrs.module';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { HeroModule } from './modules/hero/hero.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipes/validation.pipe';

@Module({
  imports: [CqrsModule, ConfigModule, DatabaseModule, HeroModule],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
