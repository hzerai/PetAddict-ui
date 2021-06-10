import { Component, OnInit } from '@angular/core';
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
  username?: string;
  user : User;

  constructor(private tokenStorageService: TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.username = JSON.parse(payload).username;
      this.userService.getUserById(this.username).subscribe(next => this.user = next)
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }


}
