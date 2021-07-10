import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { Found } from './found';
import { ImageService } from 'src/app/images-module/image.service';




@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit {

  @Input() found: Found;
  
  image: Image;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage(`Found-${this.found.id}`).subscribe(next => {this.image = next });
  }
 
  

}
