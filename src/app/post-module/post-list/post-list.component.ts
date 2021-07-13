import { Component, OnInit, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/adoption-module/adoption-list/adoption-list.component';
import { Post } from '../post/Post';
import { PostService } from '../post/post.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {


  page: number = 1;
  size: number = 6;
  count: number = 0;
  posts: Post[] = [];
  pages: Page[];


  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.postService.count().subscribe(next => {
      this.count = next; this.generatePagination();
    });
    this.postService.getPagedPosts(this.page, this.size).subscribe(next => { this.posts = next });
  }
  private nbPages = 0;

  generatePagination() {
    let pages: Page[] = [];

    this.nbPages = Math.ceil(this.count / this.size)

    if (this.nbPages <= 6) {
      for (let i = 1; i <= this.nbPages; i++) {
        pages.push(new Page(i, i == this.page, i == this.page + 1))
      }
    }
    else {
      pages.push(new Page(1, 1 == this.page, 1 == this.page + 1))
      pages.push(new Page(2, 2 == this.page, 2 == this.page + 1))
      pages.push(new Page(3, 3 == this.page, 3 == this.page + 1))
      if (this.page <= 3 || this.page >= this.nbPages - 2) {
        pages.push(new Page('...', false, false).isMiddle())
      } else {
        pages.push(new Page(this.page, true, false).isMiddle())
      }
      pages.push(new Page(this.nbPages - 2, this.nbPages - 2 == this.page, this.nbPages - 2 == this.page + 1))
      pages.push(new Page(this.nbPages - 1, this.nbPages - 1 == this.page, this.nbPages - 1 == this.page + 1))
      pages.push(new Page(this.nbPages, this.nbPages == this.page, this.nbPages == this.page + 1))
    }
    this.pages = pages;
  }
  
  next() {
    if (this.cantNext()) {
      return;
    }
    this.page++;
   
      this.postService.getPagedPosts(this.page, this.size).subscribe(next => { this.posts = next });
      this.generatePagination();
    }
  

  previous() {
    if (this.cantPrevious()) {
      return;
    }
    this.page--;
   
      this.postService.getPagedPosts(this.page, this.size).subscribe(next => { this.posts = next });
      this.generatePagination();
    }
 
  setPage(n: any) {
    if (n.middle) {
      return;
    }
    this.page = Number(n.number);

      this.postService.getPagedPosts(this.page, this.size).subscribe(next => { this.posts = next });
      this.generatePagination();
    }
  

  cantPrevious(): boolean {
    return this.page < 2;
  }

  cantNext(): boolean {
    return this.page >= this.nbPages;
  }
}




  

