import { Component, Input, OnInit } from '@angular/core';
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
  constructor(private tokenStorageService: TokenStorageService,private activatedRoute: ActivatedRoute, private router: Router,private userService:UserService) { }

  @Input() user: User;
  edit: boolean = false;
  userImage: string;

  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserByEmail(username,null).subscribe(next => {
      this.user = next;
      this.userImage = `USER-${next.id}`
    })  
  }

  editProfile() {
    this.edit = !this.edit;
  }

  updateProfile(user: User) {
    this.user = user;
    this.edit = !this.edit;
  }
}
