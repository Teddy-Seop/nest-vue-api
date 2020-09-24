import { Controller, Get, Post, Param, HttpException, HttpStatus, Body, Session, Res, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '@/models/entities';
import { LocalAuthGuard } from '../../modules/auth/local-auth.guard';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtAuthGuard } from '../../modules/auth/jwt.auth.guard';

@Controller('/user')
export class UserController {

  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  public async getUser(@Param('userId') userId: number): Promise<UserEntity> {
    let userEntity: UserEntity;

    try {
      userEntity = await this.userService.getUser(userId);
    } catch (error) {
      throw new HttpException(
        `Not found user by ID: ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return userEntity;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Body() user: UserEntity, @Req() req) {
    return this.authService.login(req.user);
  }
}
