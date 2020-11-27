import { PostObjectType } from '../type/post.object.type';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserService } from '../../user/service/user.service';

@Resolver(of => PostObjectType)
export class PostSubResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(returns => UserObjectType)
  public async writer(@Parent() post: PostObjectType): Promise<UserObjectType> {
    const user: UserObjectType = await this.userService.getUserById(
      post.userId,
    );

    return user;
  }
}
