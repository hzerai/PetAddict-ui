import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
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
  username: string;
  image: Image;
  showAdoptionButton: boolean = false;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {

    const token = this.tokenService.getToken();
    if (token == null) {
      return;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    this.username = JSON.parse(payload).username;
    let id = '';
    this.route.params.subscribe(next => {
      id = next.id;
      this.adoptionService.canAdopt(Number(id), this.username).subscribe(b => this.showAdoptionButton = b)
    });
    this.adoptionService.getAdoptionById(id, 'user').subscribe(next => { this.adoption = next });
    this.imageService.getImage(`ADOPTION-${id}`).subscribe(next => { this.image = next });
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this adoption post ?")) {
      this.adoptionService.deleteAdoption(id).subscribe(next => this.r.navigateByUrl('/adoptions'));
    }

  }

  isOwner(): boolean {
    return this.username === this.adoption.createdBy;
  }



}
