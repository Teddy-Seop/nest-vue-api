import { CommonUserService } from '@/services/common-user.service';
import { Module } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';

@Module({
  providers: [CommonUserService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
