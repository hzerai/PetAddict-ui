import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Post } from 'src/app/post-module/post/Post';
import { PostService } from 'src/app/post-module/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  pageUser: number = 1;
  sizeUser: number = 6;
  countUser: number = 0;
  pagesUser: Page[];
  posts:Post[];
  images: Map<number, Image> = new Map();

  constructor(private postService:PostService,private imageService: ImageService) { }

  ngOnInit(): void {
    this.postService.count().subscribe(next => {
      this.countUser = next; 
      this.generatePagination();
    });
    this.postService.getPagedPosts(this.pageUser, this.sizeUser).subscribe(next =>{
      this.posts = next;
      next.forEach(a => {
        this.imageService.getImage(`Post-${a.id}`).subscribe(next => { 
          ImageService.cache.cache(next); this.images.set(a.id,next) });
      })
    })

  }

  resetPage(a: any) {
    this.pageUser = 1;
    this.nbPages = 0;
  }
  private nbPages = 0;
  generatePagination() {
    let pages: Page[] = [];

    this.nbPages = Math.ceil(this.countUser / this.sizeUser)

    if (this.nbPages <= 6) {
      for (let i = 1; i <= this.nbPages; i++) {
        pages.push(new Page(i, i == this.pageUser, i == this.pageUser + 1))
      }
    }
    else {
      pages.push(new Page(1, 1 == this.pageUser, 1 == this.pageUser + 1))
      pages.push(new Page(2, 2 == this.pageUser, 2 == this.pageUser + 1))
      pages.push(new Page(3, 3 == this.pageUser, 3 == this.pageUser + 1))
      if (this.pageUser <= 3 || this.pageUser >= this.nbPages - 2) {
        pages.push(new Page('...', false, false).isMiddle())
      } else {
        pages.push(new Page(this.pageUser, true, false).isMiddle())
      }
      pages.push(new Page(this.nbPages - 2, this.nbPages - 2 == this.pageUser, this.nbPages - 2 == this.pageUser + 1))
      pages.push(new Page(this.nbPages - 1, this.nbPages - 1 == this.pageUser, this.nbPages - 1 == this.pageUser + 1))
      pages.push(new Page(this.nbPages, this.nbPages == this.pageUser, this.nbPages == this.pageUser + 1))
    }
    this.pagesUser = pages;
  }

  next() {
    if(this.cantNext()){
      return;
    }
    this.pageUser++;
      this.postService.getPagedPosts(this.pageUser, this.sizeUser).subscribe(next => { 
        this.posts = next ;
        next.forEach(a => {
          this.imageService.getImage(`Post-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
        })});
      this.generatePagination();
  }

  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.pageUser--;
      this.postService.getPagedPosts(this.pageUser, this.sizeUser).subscribe(next => {
         this.posts= next ;
        next.forEach(a => {
          this.imageService.getImage(`Post-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
        })
      });
      this.generatePagination();
  }

  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.pageUser = Number(n.number);
    this.postService.getPagedPosts(this.pageUser, this.sizeUser).subscribe(next => { 
      this.posts = next ;
      next.forEach(a => {
        this.imageService.getImage(`Post-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
      })
    });
    this.generatePagination();
  }

  cantPrevious(): boolean {
    return this.pageUser < 2;
  }

  cantNext(): boolean {
    return this.pageUser >= this.nbPages;
  }
  delete(id:number,index:number){
    this.postService.deletePost(id).subscribe(next =>{
      this.postService.count().subscribe(next => {
        this.countUser = next; 
        this.generatePagination();
      });
      this.postService.getPagedPosts(this.pageUser, this.sizeUser).subscribe(next =>{
        this.posts = next;
        next.forEach(a => {
          this.imageService.getImage(`Post-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
        })
      })
    });
  }

}

export class Page {
  number: any = 1;
  current: boolean = false;
  next: boolean = false;
  after: boolean = false;
  middle: boolean = false;
  constructor(number: any, current: boolean, next: boolean) {
    this.number = number;
    this.current = current;
    this.next = next;
    this.after = !(current || next);
  }
  isMiddle(): Page {
    this.middle = true;
    this.after = false;
    return this;
  }
}


