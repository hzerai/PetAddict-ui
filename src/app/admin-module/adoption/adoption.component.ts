import { Component, OnInit } from '@angular/core';
import { Adoption } from 'src/app/adoption-module/adoption/Adoption';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

  pageUser: number = 1;
  sizeUser: number = 6;
  countUser: number = 0;
  pagesUser: Page[];
  adoptions:Adoption[];
  images: Map<number, Image> = new Map();

  constructor(private adoptionService:AdoptionService,private imageService: ImageService) { }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => {
      this.countUser = next; 
      this.generatePagination();
    });
    this.adoptionService.getPagedAdoptions(this.pageUser, this.sizeUser,null).subscribe(next =>{
      this.adoptions = next;
      next.forEach(a => {
        this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
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
      this.adoptionService.getPagedAdoptions(this.pageUser, this.sizeUser,null).subscribe(next => { this.adoptions = next ;
        next.forEach(a => {
          this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
        })});
      this.generatePagination();
  }

  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.pageUser--;
      this.adoptionService.getPagedAdoptions(this.pageUser, this.sizeUser,null).subscribe(next => { this.adoptions
         = next ;
        next.forEach(a => {
          this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
        })
      });
      this.generatePagination();
  }

  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.pageUser = Number(n.number);
    this.adoptionService.getPagedAdoptions(this.pageUser, this.sizeUser,null).subscribe(next => { this.adoptions = next ;
      next.forEach(a => {
        this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
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
    this.adoptionService.deleteAdoption(id).subscribe(next =>{
      this.adoptionService.count().subscribe(next => {
        this.countUser = next; 
        this.generatePagination();
      });
      this.adoptionService.getPagedAdoptions(this.pageUser, this.sizeUser,null).subscribe(next =>{
        this.adoptions = next;
        next.forEach(a => {
          this.imageService.getImage(`ADOPTION-${a.id}`).subscribe(next => { ImageService.cache.cache(next); this.images.set(a.id,next) });
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
