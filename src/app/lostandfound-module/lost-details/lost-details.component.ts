import { Component, OnInit } from '@angular/core';
import { Lost } from '../lost/Lost';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LostService } from '../lost/lost.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
@Component({
  selector: 'app-lost-details',
  templateUrl: './lost-details.component.html',
  styleUrls: ['./lost-details.component.css']
})
export class LostDetailsComponent implements OnInit {

  lost: Lost = new Lost();
  currentUserId: number;
  image: Image;

  constructor(private imageService: ImageService, private route: ActivatedRoute, private lostService: LostService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.lostService.getLostById(id).subscribe(next => { this.lost = next });
    this.imageService.getImage(`Lost-${id}`).subscribe(next => { this.image = next });

    this.getCurrentUser()
  }

  delete(id: number) {
      this.lostService.deleteLost(id).subscribe(next => this.r.navigateByUrl('/losts'));

  }

  isOwner(): boolean {
    return this.currentUserId == this.lost?.user?.id;
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
    this.userService.getUserByEmail(username,null).subscribe(next => {
      this.currentUserId = next.id;
    })
  }
}
