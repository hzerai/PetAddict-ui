import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { CKEditorComponent } from 'ckeditor4-angular';
import { ImageService } from 'src/app/images-module/image.service';
import { ImageComponent } from 'src/app/images-module/image/image.component';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Post } from '../post/Post';
import { PostService } from '../post/post.service';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  imageName: string;
  post: Post = new Post();
  postForm: FormGroup;
  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  @ViewChild(CKEditorComponent)
  ck:CKEditorComponent;
  userFullName:string;

  constructor(private imageService: ImageService, private postService: PostService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService,private notifier: NotifierService,private userService : UserService
    ) {

  }

  ngOnInit(): void {
    let isLoggedIn = !!this.tokenStorageService.getToken();
    if (!isLoggedIn) {
      this.router.navigateByUrl("/posts");
    }
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.minLength(10),Validators.required]),
    })
    let id;
    this.ac.params.subscribe(next => id = next.id)

    if (id) {
      this.imageName = `Post-${id}`;
      this.postService.getPostById(id).subscribe(next => {
        this.postForm.setValue({
          title: next.title,
        }); 

        this.post = next;
        this.ck.data=next.body;
      })
    }else {
      const token = this.tokenStorageService.getToken();
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      this.userService.getUserById(JSON.parse(payload).username , null).subscribe(next => {
        this.userFullName = next.firstName+" "+next.lastName;
      });
    }
  }
  onSubmit() {
    if (this.postForm.invalid) {
      this.notifier.notify('error', 'Incomplete data.');
      return;
    }
    this.post.title = this.postForm.value.title
    this.post.body = this.ck.data
    if (this.post.id) {
      //update
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.postService.updatePost(this.post).subscribe(next => { this.router.navigateByUrl("/post/" + this.post.id) })
    } else {
      //create
      this.post.userFullName =  this.userFullName;
      this.postService.newPost(this.post).subscribe(next => {
        this.imageComponent.autoUpload = true;
        this.imageComponent.imageName = `Post-${next.id}`;
        this.imageComponent.image.name = `Post-${next.id}`;
        this.imageComponent.uploadImage();
        this.post = next; 
        this.router.navigateByUrl("/post/" + this.post.id);
      })
    }
  }

}
