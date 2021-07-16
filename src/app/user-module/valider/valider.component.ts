import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-valider',
  templateUrl: './valider.component.html',
  styleUrls: ['./valider.component.css']
})
export class ValiderComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.authService.valider(params.expires,params.id,params.signature, params.token).subscribe(
          data => {
            this.isSuccessful = true;
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
}
