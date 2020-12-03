import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../graphql/user/service/user.service';
import { AccessTokenObjectType, UserObjectType } from '../../graphql/user/type/user.object-type';
import { UserLoginInputType } from '../../graphql/user/type/user.input-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    loginUser: UserLoginInputType
  ): Promise<UserObjectType> {
    const user: UserObjectType = await this.userService.getUser(loginUser.email, loginUser.password);

    if (user && user.password === loginUser.password) {
      return user;
    }

    return null;
  }

  public async login(user: UserLoginInputType): Promise<AccessTokenObjectType> {
    const loginUser: UserObjectType = await this.validateUser(user);
    const payload = { username: user.email, sub: user.password };

    if (!loginUser) {
      return { accessToken: 'fail' };
    }

    return {
      accessToken: this.jwtService.sign(payload),
      userId: loginUser.id,
    };
  }
}
