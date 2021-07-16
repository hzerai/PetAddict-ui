import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images-module/image.service';
import { PetAddictDate } from 'src/app/user-module/messages-module/PetAddictDates';
import { User } from 'src/app/user-module/User';
import { Post } from '../post/Post';
import { PostService } from '../post/post.service';
import { Comment } from './Comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
@Input() comment:any ;
  commentBody:string="";
@Input() currentUserFullName:string;
  username: string;
  post: Post = new Post();
@Input() currentUser:User; 
@Input() currentUserImage:string;
  constructor(private postService: PostService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.imageService.getImage('USER-'+this.comment.userId).subscribe
    (i=>{ if(i==null ){this.comment.image='https://www.w3schools.com/howto/img_avatar.png'}
    else
    {this.comment.image=i.bytes}});

  }
  repcomment(){
    if(this.commentBody.length>0){
      let comment: any = {};
      comment.body=this.commentBody;
      comment.userFullName=this.currentUserFullName;
      comment.createdAt=new Date();
      comment.createdBy=this.username;
      comment.image=this.currentUserImage;
      this.postService.reply(this.post.id,this.comment.id,comment).subscribe();
      this.comment.comments.unshift(comment);
      this.commentBody="";
      this.comment.reply=false;
      console.log(comment);
    }
}
isOwner(): boolean {
  return this.username === this.post.createdBy;
}
getHumanDate(time: Date): string {
  return PetAddictDate.getHumanDate(time);
}
}