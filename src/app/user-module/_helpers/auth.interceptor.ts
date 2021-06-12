import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {catchError} from 'rxjs/operators'; 


const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,private token: TokenStorageService,private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
      const token = this.token.getToken();
      if (token != null) {
        let payload;
        payload = token.split(".")[1];
        payload = window.atob(payload);
        const now = new Date();
        if(this.token.getExpirationDate().getTime() > now.getTime()){
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        else{
          this.authService.refreshToken(this.token.getRefreshToken()).subscribe(
            data => {
              this.token.saveToken(data.token);
              this.token.saveRefreshToken(data.refresh_token)
              let payload;
              payload = data.token.split(".")[1];
              payload = window.atob(payload);
              this.token.saveUser(JSON.parse(payload).username);
              const expirationDate = (JSON.parse(payload).exp * 1000);
              this.token.saveExpirationDate(expirationDate);      
            }
          );
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()) });
        }
      }
      return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x))); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (this.router.url!="/login" && (err.status === 401 || err.status === 403)) {
        //navigate /delete cookies or whatever
        this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }

    return throwError(err);
}
}



export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];