import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user-module/User';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.css']
})
export class AdoptionRequestComponent implements OnInit {
  adoption: Adoption = new Adoption();
  currentUser: User;
  constructor(private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.adoptionService.getAdoptionById(id).subscribe(next => { next == null ? this.r.navigateByUrl('/adoptions') : this.adoption = next });
    this.getCurrentUser()
  }
  getCurrentUser() {
    const token = this.tokenService.getToken();
    if (token == null) {
      return;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      this.currentUser = next;
    })
  }

  envoyerDemande(){
    this.adoptionService.createAdoptionRequest(this.adoption.id).subscribe(next => this.r.navigate(['/user_profile']));
  }
}
