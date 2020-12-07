import { Injectable } from '@nestjs/common';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserAdapterService } from '@/modules/adpater/user/user.adapter.service';

@Injectable()
export class UserService {
  constructor(private readonly userAdapterService: UserAdapterService) {}

  public async getUserById(userId: number): Promise<UserObjectType> {
    const user: UserObjectType = await this.userAdapterService.getUserById(
      userId,
    );

    return user;
  }

  public async getUser(
    email: string,
    password: string,
  ): Promise<UserObjectType> {
    const user: UserObjectType = await this.userAdapterService.getUser(
      email,
      password,
    );

    return user;
  }
}
