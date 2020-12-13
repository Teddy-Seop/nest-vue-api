import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserObjectType } from '@/graphql/user/type/user.object-type';
import { UserAdapterService } from '@/modules/adpater/user/user.adapter.service';
import { SaveUserInputType } from '../type/user.input-type';

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

    await bcrypt.hash(user.password, saltRounds, async (err, hash) => {
      if (err) throw err;

      user.password = hash;
      await this.userAdapterService.saveUser(user);
    });

    return true;
  }
}
