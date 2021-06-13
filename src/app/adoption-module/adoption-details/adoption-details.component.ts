import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user-module/User';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';


@Component({
  selector: 'app-adoption-details',
  templateUrl: './adoption-details.component.html',
  styleUrls: ['./adoption-details.component.css']
})
export class AdoptionDetailsComponent implements OnInit {
  adoption: Adoption = new Adoption();
  currentUserId: string;
  constructor(private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.route.queryParamMap.subscribe(next => this.adoption = JSON.parse(next.get('adoption')));
    this.getCurrentUser()
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this adoption post ?")) {
      this.adoptionService.deleteAdoption(id).subscribe(next => this.r.navigateByUrl('/adoptions'));
    }
  }

  edit() {
    this.r.navigate(['/adoptions/' + this.adoption.id + '/edit'], { queryParams: { adoption: JSON.stringify(this.adoption) } })
  }

  isOwner(): boolean {
    return this.currentUserId == this.adoption?.user?.email;
  }

  getCurrentUser() {
    const token = this.tokenService.getToken();
    if (token == null) {
      return;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    this.currentUserId = JSON.parse(payload).username;

  }

}
