import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
  user: User;
  edit: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(next => this.user = JSON.parse(next.get('user')));
  }

  editProfile() {
    this.edit = true;
  }

  visitAdoption(adoption) {
    this.user.adoptions = [];
    adoption.user = this.user;
    this.router.navigate(['/adoptions', adoption.id], { queryParams: { adoption: JSON.stringify(adoption) } })
  }

  visitAdoptionRequest(adoption) {    
    this.router.navigate(['/adoptions', adoption.id], { queryParams: { adoption: JSON.stringify(adoption) } })
  }
}
