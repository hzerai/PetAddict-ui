import { Component, Input, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { Found } from './found';
import { ImageService } from 'src/app/images-module/image.service';
import { FoundService } from './found.service';
import { Comment } from 'src/app/post-module/comment/Comment';
@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.css']
})
export class FoundComponent implements OnInit {

  username: string;
  commentBody: string = "";
  currentUserFullName: string;
  @Input() found: Found;
  image: Image;

  constructor(private imageService: ImageService, private foundService: FoundService) { }

  ngOnInit(): void {
    this.imageService.getImage(`Found-${this.found.id}`).subscribe(next => { this.image = next });
  }

  comment() {
    if (this.commentBody.length > 0) {
      let comment = new Comment();
      comment.body = this.commentBody;
      comment.userFullName = this.currentUserFullName;
      comment.createdAt = new Date();
      comment.createdBy = this.username;
      this.foundService.addCommentfound(this.found.id, comment).subscribe();
      this.found.comments.unshift(comment);
      this.commentBody = "";
    }
  }

}
