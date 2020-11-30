import { Injectable } from '@nestjs/common';
import { CommonUserService } from '@/services/common-user.service';
import { UserObjectType } from '@/graphql/user/type/user.object-type';

@Injectable()
export class UserService {
  constructor(private readonly commonUserService: CommonUserService) {}

  public async getUserById(userId: number): Promise<UserObjectType> {
    const user: UserObjectType = await this.commonUserService.getUserById(
      userId,
    );

    return user;
  }

  public async getUser(
    email: string,
    password: string,
  ): Promise<UserObjectType> {
    const user: UserObjectType = await this.commonUserService.getUser(
      email,
      password,
    );

    return user;
  }
}
