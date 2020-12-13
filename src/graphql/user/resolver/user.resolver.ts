import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { AccessTokenObjectType } from '../type/user.object-type';
import { UserLoginInputType, SaveUserInputType } from '../type/user.input-type';
import { AuthService } from '@/modules/auth/auth.service';

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
    const result = await this.authService.login(user);

    return result;
  }

  @Mutation(returns => Boolean)
  public async saveUser(
    @Args('user', { type: () => SaveUserInputType }) user: SaveUserInputType,
  ): Promise<boolean> {
    try {
      const result: boolean = await this.userService.saveUser(user);

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Query(returns => Boolean)
  public async test(
    @Args('user', { type: () => UserLoginInputType }) user: UserLoginInputType,
  ): Promise<boolean> {
    await this.userService.checkPassword(user);

    return true;
  }
}
