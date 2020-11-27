import { PostObjectType } from '../type/post.object.type';
import { PostService } from '../service/post.service';
import { Resolver } from '@nestjs/graphql';

@Resolver(of => PostObjectType)
export class PostSubResolver {
  constructor(private readonly postService: PostService) {}

  public getUser;
}
