import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProvider {
  fectUsers() {
    return { users: 'All users' };
  }
  
  createUser() {
    return { name: 'Dennis Muhia', age: 30 };
  }
}
