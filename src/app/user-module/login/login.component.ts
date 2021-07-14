import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,private location:Location, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.location.back();
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveRefreshToken(data.refresh_token)
        let payload;
        payload = data.token.split(".")[1];
        payload = window.atob(payload);
        this.tokenStorage.saveUser(JSON.parse(payload).username);
        const expirationDate = (JSON.parse(payload).exp * 1000);
        this.tokenStorage.saveExpirationDate(expirationDate);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        
        this.roles = JSON.parse(payload).roles;
        if(this.roles.indexOf('ROLE_ADMIN') > -1){
          this.router.navigateByUrl('/admin');
        }
        else{
          this.reloadPage();
        }
      },
      err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}