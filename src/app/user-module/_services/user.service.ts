import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../User';
import { environment } from 'src/environments/environment';

const API_URL = environment.backUrl + '/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // private getPublicContent(): Observable<User[]> {
  //   return this.http.get<User[]>(API_URL);
  // }

  getUserById(id: string, key: string): Observable<User> {
    let params = new HttpParams();
    if (key != null && key.length > 0) {
      params = params.append('key', key);
    }
    return this.http.get<User>(API_URL + 'user_by_email/' + id, { params });
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(API_URL + user.id, user);
  }

  
  deleteUser(user: User):Observable<User> {
    return this.http.delete<User>(API_URL + user.id);
  }

  triggerStatus(id:number):Observable<User>{
    return this.http.put<User>(API_URL+'status/'+id,null);
  }
  getPagedUsers(page: number = 1, size: number = 6): Observable<User[]> {

      let params = new HttpParams();
      params = params.append('page', String(page));
      params = params.append('size', String(size));
      return this.http.get<User[]>(API_URL, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(API_URL + 'count');
  }
}
