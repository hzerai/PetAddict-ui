import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  user: User;
  edit: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.edit = params.edit ? Boolean(params.edit) : this.edit;
      })

    const token = this.tokenStorageService.getToken();
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      this.user = next;
    })
  }

  editProfile() {
    this.edit = true;   
  }
}
