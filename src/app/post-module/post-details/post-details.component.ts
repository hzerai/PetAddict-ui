import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Comment } from '../comment/Comment';
import { Post } from '../post/Post';
import { PostService } from '../post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: Post = new Post();
  currentUserId: number;
  username: string;
  image: Image;
  htmlData:SafeHtml;
  commentBody:string="";
  currentUserFullName:string;
  constructor(private imageService: ImageService, private route: ActivatedRoute, private postService: PostService, private r: Router, private userService: UserService, private tokenService: TokenStorageService,private sanitizer : DomSanitizer) { }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token == null) {
      return;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    this.username = JSON.parse(payload).username;
    let id = '';
    this.route.params.subscribe(next => {
      id = next.id;
    });
    this.userService.getUserByEmail(this.username,null).subscribe(next=>this.currentUserFullName=next.firstName+" "+next.lastName);
    this.postService.getPostById(id).subscribe(next => { this.post = next ; 
    this.htmlData=this.sanitizer.bypassSecurityTrustHtml(next.body);
    });
    this.imageService.getImage(`Post-${id}`).subscribe(next => { this.image = next });
  }
  delete(id: number) {
    if (confirm("Are you sure to delete this blog ?")) {
      this.postService.deletePost(id).subscribe(next => this.r.navigateByUrl('/posts'));
    }

  }

  isOwner(): boolean {
    return this.username === this.post.createdBy;
  }
comment(){
if(this.commentBody.length>0){
  let comment=new Comment();
  comment.body=this.commentBody;
  comment.userFullName=this.currentUserFullName;
  comment.createdAt=new Date();
  comment.createdBy=this.username;
  this.postService.addComment(this.post.id,comment).subscribe();
  this.post.comments.unshift(comment);
  this.commentBody="";
}
}
}
