import { Module, Global, DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [],
  exports: [LoggerService],
  providers: [LoggerService],
})
export class LoggerModule {}
