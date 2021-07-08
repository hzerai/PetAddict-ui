import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  @Input() user: User;
  edit: boolean = false;
  userImage: string;

  ngOnInit(): void {
    this.userImage = `USER-${this.user?.id}`
  }

  editProfile() {
    this.edit = !this.edit;
  }

  updateProfile(user: User) {
    this.user = user;
    this.edit = !this.edit;
  }
}
