import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';
import { environment } from 'src/environments/environment';

const API_URL = environment.backUrl + '/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static cache: UserCacheService;
  constructor(private http: HttpClient) {
    UserService.cache = new UserCacheService();
    this.getPublicContent().subscribe(next => UserService.cache.cacheAll(next));
  }

  private getPublicContent(): Observable<User[]> {
    return this.http.get<User[]>(API_URL);
  }

  getUserById(id: string): Observable<User> {
    return UserService.cache.has(id) ? of(UserService.cache.get(id)) : this.http.get<User>(API_URL + 'user_by_email/' + id);
  }

  updateUserProfile(user: User): Observable<User> {
    UserService.cache.remove(user.email);
    return this.http.put<User>(API_URL + user.id, user);
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
    users.forEach(user => {
      if (!this.users.has(user.username))
        this.users.set(user.username, user)
    })
  }

  has(email: string): boolean {
    return this.users.has(email);
  }

  remove(email: string): void {
    this.users.delete(email);
  }

}