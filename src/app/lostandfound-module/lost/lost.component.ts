import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Lost } from './Lost';
import { LostService } from './lost.service';
import { Comment } from 'src/app/post-module/comment/Comment';
@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent implements OnInit {

  username: string;
  commentBody:string="";
  currentUserFullName:string;
  @Input() lost: Lost;
  image: Image;
  constructor(private imageService: ImageService, private lostService : LostService) { }

  ngOnInit(): void {
    this.imageService.getImage(`Lost-${this.lost.id}`).subscribe(next => {this.image = next });
  }
  comment(){
    if(this.commentBody.length>0){
      let comment=new Comment();
      comment.body=this.commentBody;
      comment.userFullName=this.currentUserFullName;
      comment.createdAt=new Date();
      comment.createdBy=this.username;
      this.lostService.addCommentlost(this.lost.id,comment).subscribe();
      this.lost.comments.unshift(comment);
      this.commentBody="";
    }
    }

}
