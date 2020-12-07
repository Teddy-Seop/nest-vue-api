import { UserAdapterService } from './user.adapter.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserAdapterService],
  exports: [UserAdapterService],
})
export class UserAdapterModule {}
