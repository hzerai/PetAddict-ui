import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
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
  currentUserId: number;
  image: Image;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.adoptionService.getAdoptionById(id).subscribe(next => { this.adoption = next });
    this.imageService.getImage(`ADOPTION-${id}`).subscribe(next => { this.image = next ; console.log(next)});

    this.getCurrentUser()
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this adoption post ?")) {
      this.adoptionService.deleteAdoption(id).subscribe(next => this.r.navigateByUrl('/adoptions'));
    }

  }

  isOwner(): boolean {
    return this.currentUserId == this.adoption?.user?.id;
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
      this.currentUserId = next.id;
    })
  }

}
