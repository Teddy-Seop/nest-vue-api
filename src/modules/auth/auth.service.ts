import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../graphql/user/service/user.service';
import {
  AccessTokenObjectType,
  UserObjectType,
} from '../../graphql/user/type/user.object-type';
import { UserLoginInputType } from '../../graphql/user/type/user.input-type';
import { UserAdapterService } from '../adpater/user/user.adapter.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userAdapterService: UserAdapterService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async checkPassword(
    loginInfo: UserLoginInputType,
  ): Promise<UserObjectType> {
    const user: UserObjectType = await this.userAdapterService.getUserByEmail(
      loginInfo.email,
    );

    const result = await bcrypt.compare(loginInfo.password, user.password);

    if (!result) {
      return null;
    }

    return user;
  }

  public async login(user: UserLoginInputType): Promise<AccessTokenObjectType> {
    const loginUser: UserObjectType = await this.checkPassword(user);
    const payload = { username: user.email, sub: user.password };

    if (!loginUser) {
      return { accessToken: 'fail' };
    }

    return {
      accessToken: this.jwtService.sign(payload),
      userId: loginUser.id,
      email: loginUser.email,
      name: loginUser.name,
    };
  }
}
