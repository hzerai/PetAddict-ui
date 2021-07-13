import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/adoption-module/adoption/animal.service';
import { Query } from 'src/app/interface-module/filter/Query';
import { VillesService } from 'src/app/user-module/villes.service';
import { Lost } from '../lost/Lost';
import { LostService } from '../lost/lost.service';

@Component({
  selector: 'app-lost-list',
  templateUrl: './lost-list.component.html',
  styleUrls: ['./lost-list.component.css']
})
export class LostListComponent implements OnInit {

  page: number = 1;
  size: number = 6;
  count: number = 0;
  losts: Lost[] = [];
  query: Query = new Query();
  pages: Page[];


  constructor(private lostService: LostService, private route: ActivatedRoute, private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.lostService.count().subscribe(next => {
      this.count = next; this.generatePagination();
    });
    this.lostService.getPagedLosts(this.page, this.size).subscribe(next => { this.losts = next });
  }
  populateSuggestions() {
    if (this.suggestions.indexOf('Tunis') < 0)
      Object.values(VillesService.villes).forEach(v => { this.suggestions.push(v.name); v.municipalities.forEach(k => this.suggestions.push(k.name)) })
  }

  next() {
    if(this.cantNext()){
      return;
    }
    this.page++;
      this.lostService.getPagedLosts(this.page, this.size).subscribe(next => { this.losts = next });
      this.generatePagination();
    
  }

  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.page--;
      this.lostService.getPagedLosts(this.page, this.size).subscribe(next => { this.losts = next });
      this.generatePagination();
  }

  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.page = Number(n.number);
      this.lostService.getPagedLosts(this.page, this.size).subscribe(next => { this.losts = next });
      this.generatePagination();
  }

  cantPrevious(): boolean {
    return this.page < 2;
  }

  cantNext(): boolean {
    return this.page >= this.nbPages;
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
  

  suggestions: string[] = LostService.suggestions;;
  autoComplete: string[] = [];
  autoC = true;


  
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
