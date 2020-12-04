import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeORMConfigService } from './typeorm-config';
import * as Entities from './entities';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

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
export class DatabaseModule {
  public static forRoot(): DynamicModule {
    initializeTransactionalContext();

    return {
      module: DatabaseModule,
    };
  }
}
