
import { Module, forwardRef } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from '../../modules/auth/auth.service';
import { AuthModule } from '../../modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => AuthModule)],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, AuthService],
})
export class UserModule {}