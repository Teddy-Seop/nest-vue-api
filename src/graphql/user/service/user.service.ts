import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserAdapterService } from '@/modules/adpater/user/user.adapter.service';
import { SaveUserInputType, UserLoginInputType } from '../type/user.input-type';

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

  public async saveUser(user: SaveUserInputType): Promise<boolean> {
    const saltRounds = 10;

    await bcrypt.hash(user.password, saltRounds).then(async hash => {
      user.password = hash;
      await this.userAdapterService.saveUser(user);
    });

    return true;
  }

  public async checkPassword(
    loginInfo: UserLoginInputType,
  ): Promise<UserObjectType> {
    const user: UserObjectType = await this.userAdapterService.getUserByEmail(
      loginInfo.email,
    );

    const result = await bcrypt.compare(loginInfo.password, user.password);

    return result;
  }
}
