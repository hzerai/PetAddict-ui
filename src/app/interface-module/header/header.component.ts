import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user-module/User';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  user?: User;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.userService.getUserById(JSON.parse(payload).username).subscribe(next => {
        this.user = next;
      });
    }
  }

  profile() {
    this.router.navigate(['/user_profile'], { queryParams: { user: JSON.stringify(this.user) } })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
