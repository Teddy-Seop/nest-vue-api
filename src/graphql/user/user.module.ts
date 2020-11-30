import { CommonUserService } from '@/services/common-user.service';
import { Module, forwardRef } from '@nestjs/common';
import { UserResolver } from './resolver/user.resolver';
import { UserService } from './service/user.service';
import { AuthModule } from '../../modules/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [CommonUserService, UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
