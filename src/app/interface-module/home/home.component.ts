import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Adoption } from 'src/app/adoption-module/adoption/Adoption';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
    { 'image': 'assets/images/slider/1.jpg' },
    { 'image': 'assets/images/slider/2.jpg' },
    { 'image': 'assets/images/slider/3.jpg' },
  ];

  adoptions: Map<number, Adoption[]> = new Map();
  adoptionskey: number[] = [];
  images: Map<number, Image> = new Map();
  waiting: Number = 0;
  soulsSaved: number = 0;
  lost: number = 0;
  startDate: number = Math.floor(((new Date().getTime()) - (new Date('2021-06-17').getTime())) / (1000 * 3600 * 24));

  constructor(private adoptionService: AdoptionService, private imageService: ImageService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<number>(environment.backUrl + '/home/soulssaved').subscribe(next => {
      this.soulsSaved = next;
    });
    this.http.get<number>(environment.backUrl + '/home/lost').subscribe(next => {
      this.lost = next;
    });
    this.http.get<number>(environment.backUrl + '/home/waiting').subscribe(next => {
      this.waiting = next;
    });
    for (let i = 0; i < 3; i++) {
      this.adoptionService.getPagedAdoptions(i + 1, 4, null).subscribe(next => {
        this.adoptionskey.push(i);
        this.adoptions.set(i, next);
        next.forEach(a => {
          this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { this.images.set(a.id, next) });
        })
      });
    }


  }

  @ViewChild("textslider", { static: false }) textslider: ElementRef;
  @ViewChild("slider", { static: false }) slider: ElementRef;
  ngAfterViewInit() {
    this.textslider?.nativeElement.setAttribute('style', 'height:' + this.slider?.nativeElement.clientHeight);
  }

}
