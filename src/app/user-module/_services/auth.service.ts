import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.backUrl + '/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      email,
      password
    }, httpOptions);
  }
  
  valider(expires: string, id: string,signature: string, token: string): Observable<any> {
    let params = new HttpParams()
      .set('expires',expires)
      .set('id',id)
      .set('signature',encodeURIComponent(signature))
      .set('token',encodeURIComponent(token))
    return this.http.post(AUTH_API + 'verify?'+params,null, httpOptions);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(AUTH_API + 'token/refresh', {
      refreshToken,
    }, httpOptions);
  }

  forgetsend(email:string){
    return this.http.post(AUTH_API + 'forgetMdp', {
      email,
    }, httpOptions);
  }

  checkidentiy(expires: string, id: string,signature: string, token: string): Observable<any> {
    let params = new HttpParams()
      .set('expires',expires)
      .set('id',id)
      .set('signature',encodeURIComponent(signature))
      .set('token',encodeURIComponent(token))
    return this.http.post(AUTH_API + 'verifyuser?'+params,null, httpOptions);
  }

  changepassword(confirmPassword: string, password: string,expires: string, id: string,signature: string, token: string): Observable<any> {
    let params = new HttpParams()
      .set('expires',expires)
      .set('id',id)
      .set('signature',encodeURIComponent(signature))
      .set('token',encodeURIComponent(token))
    return this.http.post(AUTH_API + 'changepasswordbyemail?'+params, {
      password,
      confirmPassword
    }, httpOptions);
  }


}