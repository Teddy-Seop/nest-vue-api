import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../graphql/user/service/user.service';
import { UserObjectType } from '../../graphql/user/type/user.object-type';
import { UserLoginInputType } from '../../graphql/user/type/user.input-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserObjectType> {
    const user = await this.userService.getUser(email, password);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  public async login(user: UserLoginInputType) {
    const payload = { username: user.email, sub: user.password };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
