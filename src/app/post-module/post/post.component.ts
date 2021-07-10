import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Post } from './Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  image: Image;

  @Input()post:Post=new Post();
  constructor(private imageService: ImageService){}
  

  ngOnInit(): void {
    this.imageService.getImage(`Post-${this.post.id}`).subscribe(next => { this.image = next });

  }
}