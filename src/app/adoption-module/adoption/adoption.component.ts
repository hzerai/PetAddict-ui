import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Adoption } from './Adoption';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {


  @Input() adoption: Adoption;
  image: Image;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage(`ADOPTION-${this.adoption.id}`).subscribe(next => {this.image = next });
  }
}
