import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }
  repcomment(){
    if(this.commentBody.length>0){
      let comment=new Comment();
      comment.body=this.commentBody;
      comment.userFullName=this.currentUserFullName;
      comment.createdAt=new Date();
      comment.createdBy=this.username;
      this.postService.reply(this.post.id,this.comment.id,comment).subscribe();
      this.comment.comments.unshift(comment);
      this.commentBody="";
      this.comment.show=false;
    }
}
isOwner(): boolean {
  return this.username === this.post.createdBy;
}
}