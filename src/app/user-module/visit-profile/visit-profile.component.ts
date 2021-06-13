import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css']
})
export class VisitProfileComponent implements OnInit {

  user: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private tokenService: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    let id;
    this.activatedRoute.queryParamMap.subscribe(next => id = next.get('id'))
    if (id == this.tokenService.getUser()) {
      this.route.navigate(['/user_profile']);
    } else {
      this.userService.getUserById(id).subscribe(next => this.user = next)

    }


  }

}
