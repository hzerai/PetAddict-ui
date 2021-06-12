import { Component, Input, OnInit } from '@angular/core';
import { User } from '../User';

@Component({
  selector: 'app-user-profile-show',
  templateUrl: './user-profile-show.component.html',
  styleUrls: ['./user-profile-show.component.css']
})
export class UserProfileShowComponent implements OnInit {

  @Input() user : User;
  constructor() { }

  ngOnInit(): void {
  }

}
