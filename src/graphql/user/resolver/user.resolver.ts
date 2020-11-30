import { Query, Resolver, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import {
  UserObjectType,
  AccessTokenObjectType,
} from '../type/user.object-type';
import { UserLoginInputType } from '../type/user.input-type';
import { AuthService } from '../../../modules/auth/auth.service';
import { Any } from 'typeorm';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Query(returns => AccessTokenObjectType)
  public async login(
    @Args('user', { type: () => UserLoginInputType }) user: UserLoginInputType,
  ): Promise<AccessTokenObjectType> {
    const accessToken = await this.authService.login(user);

    return accessToken;
  }
}
