import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';

const API_URL = 'http://localhost:8000/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static cache: UserCacheService;
  constructor(private http: HttpClient) {
    UserService.cache = new UserCacheService();
    this.getPublicContent();
  }

  getPublicContent(): Observable<User[]> {
    let allUsersFromDB = this.http.get<User[]>(API_URL);
    allUsersFromDB.subscribe(next => UserService.cache.cacheAll(next))
    return allUsersFromDB;
  }

  getUserById(id: string): Observable<User> {
    if (UserService.cache.has(id)) {
      return of(UserService.cache.get(id));
    } else {
      let userFromBack = this.http.get<User>(API_URL + 'user_by_email/' + id);
      userFromBack.subscribe(next => UserService.cache.cache(next))
      return userFromBack;
    }
  }

  updateUserProfile(user: User): Observable<User> {
    UserService.cache.remove(user.email);
    let updatedUser = this.http.put<User>(API_URL +user.id, user);
    updatedUser.subscribe(next => UserService.cache.cache(next))
    return updatedUser;
  }
}

class UserCacheService {

  private users: Map<string, User> = new Map();
  constructor() { }

  getAll(): User[] {
    return Object.values(this.users.values)
  }

  get(email: string): User {
    return this.users.get(email);
  }

  cache(user: User): void {
    this.users.set(user.username, user);
  }

  cacheAll(users: User[]): void {
    users.forEach(user => this.users.set(user.username, user))
  }

  has(email: string): boolean {
    return this.users.has(email);
  }

  remove(email: string): void {
    this.users.delete(email);
  }

}