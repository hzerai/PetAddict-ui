import { Injectable } from '@angular/core';
import { User } from '../user-module/User';

@Injectable({
  providedIn: 'root'
})
export class UserCacheService {
  private static users: Map<string, User> = new Map();
  constructor() { }

  getAll(): User[] {
    return Object.values(UserCacheService.users.values)
  }

  get(email: string): User {
    return UserCacheService.users.get(email);
  }

  cache(user: User) : void {
    UserCacheService.users.set(user.username, user);
  }

  has(email: string) : boolean{
    return UserCacheService.users.has(email);
  }

  remove(email: string) : void{
    UserCacheService.users.delete(email);
  }

}
