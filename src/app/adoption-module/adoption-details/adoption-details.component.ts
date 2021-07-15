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
  canAdopt: boolean = false;
  isowner: boolean;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.username = data.data.username;
      this.adoption = data.data.adoption;
      this.canAdopt = data.data.canAdopt;
      this.isowner = data.data.owner;
      this.imageService.getImage(`ADOPTION-${data.data.adoption.id}`).subscribe(next => { this.image = next });
    });
  }

  delete(id: number) {
    if (confirm("Are you sure to delete this adoption post ?")) {
      this.adoptionService.deleteAdoption(id).subscribe(next => this.r.navigateByUrl('/adoptions'));
    }
  }
}
