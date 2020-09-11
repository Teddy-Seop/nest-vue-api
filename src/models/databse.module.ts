import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeORMConfigService } from './typeorm-config';
import * as Entities from './entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeORMConfigService }),
    TypeOrmModule.forFeature(Object.values(Entities)),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}