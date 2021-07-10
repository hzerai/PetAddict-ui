import { Component, OnInit } from '@angular/core';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { User } from 'src/app/user-module/User';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  countAdoption:Number=0;

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => {
      this.countAdoption = next;
    });
  }
}
