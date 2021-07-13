import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Lost } from './Lost';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {

  @Input() lost: Lost;
  image: Image;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage(`Lost-${this.lost.id}`).subscribe(next => {this.image = next });
  }

}
