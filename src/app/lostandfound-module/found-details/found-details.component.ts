import { Component, OnInit } from '@angular/core';
import { Found } from '../found/found';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FoundService } from '../found/found.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';



@Component({
  selector: 'app-found-details',
  templateUrl: './found-details.component.html',
  styleUrls: ['./found-details.component.css']
})
export class FoundDetailsComponent implements OnInit {

  found: Found = new Found();
  currentUserId: number;
  image: Image;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private foundService: FoundService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.foundService.getFoundById(id).subscribe(next => { this.found = next });
    this.imageService.getImage(`Found-${id}`).subscribe(next => { this.image = next });

    this.getCurrentUser()
  }
  delete(id: number) {
      this.foundService.deleteFound(id).subscribe(next => this.r.navigateByUrl('/founds'));
  }

  isOwner(): boolean {
    return this.currentUserId == this.found?.user?.id;
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
    this.userService.getUserById(username,null).subscribe(next => {
      this.currentUserId = next.id;
    })
  }

}
