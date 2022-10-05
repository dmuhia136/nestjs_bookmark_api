import { Controller, Get, Post } from '@nestjs/common';
import { UserProvider } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userProvider:UserProvider) {}

  @Get('all')
  fectchAll() {
    return this.userProvider.fectUsers()
  }
  @Post('create')
  createUser(){
    return this.userProvider.createUser()
  }
}
