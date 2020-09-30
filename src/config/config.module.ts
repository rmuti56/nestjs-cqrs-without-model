import { Global, Module } from '@nestjs/common';
import {ConfigModule as Config} from '@nestjs/config'

@Global()
@Module({
    imports: [Config.forRoot()],
    exports: [Config]
})
export class ConfigModule {}
