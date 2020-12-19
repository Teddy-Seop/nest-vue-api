import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { UserAdapterModule } from '@/modules/adpater/user/user.adapter.module';

@Module({
  imports: [UserAdapterModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
