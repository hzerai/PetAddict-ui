import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  userid;
  isSuccessful = false;
  canEdit=false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private route: ActivatedRoute,private userService: UserService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.userid=params.id;
        this.authService.checkidentiy(params.expires,params.id,params.signature, params.token).subscribe(
          data => {
            this.canEdit = true;
            this.isSignUpFailed = false;
          },
          err => {
            this.errorMessage = err.error;
            this.isSignUpFailed = true;
          }
        );
      }
    );
  }

  onSubmit(): void {
    const {password ,confirmPassword} = this.form;
    if(password===confirmPassword){
      this.route.queryParams.subscribe(params => {
    this.authService.changepassword(password,confirmPassword,params.expires,params.id,params.signature, params.token).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    });}
  else{
    this.errorMessage = "Password and confirmed password are not the same"
        this.isSignUpFailed = true;
  }
  }
}
