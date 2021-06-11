import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../User';

const API_URL = 'http://localhost:8000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'text' });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(API_URL + '/user_by_email/' + id);
  }
}