import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Adoption } from 'src/app/adoption-module/adoption/Adoption';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
    {'image': 'assets/images/slider/1.jpg'}, 
    {'image': 'assets/images/slider/2.jpg'}, 
    {'image': 'assets/images/slider/3.jpg'}, 
  ];

  adoptions: Adoption[] = [];
  images: Image[]=[];
  countAdoption:Number=0;
  startDate:number= Math.floor(((new Date().getTime())-(new Date('2021-06-17').getTime()))/(1000 * 3600 * 24));

  constructor(private adoptionService: AdoptionService,private imageService: ImageService) { }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => {
      this.countAdoption = next;
    });
    this.adoptionService.getPagedAdoptions(1, 4).subscribe(next => { this.adoptions = next; 
      this.adoptions.forEach(a => {
      this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.push(next) });
      })
    });

  }
  
  @ViewChild("textslider", {static: false}) textslider: ElementRef;
  @ViewChild("slider", {static: false}) slider: ElementRef;
  ngAfterViewInit() {
    this.textslider?.nativeElement.setAttribute('style','height:'+this.slider?.nativeElement.clientHeight);
  }

}
