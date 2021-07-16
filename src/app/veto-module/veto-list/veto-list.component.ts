import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ImageService } from 'src/app/images-module/image.service';
import { Query } from 'src/app/interface-module/filter/Query';
import { Veto } from '../Veto';
import { VetoService } from '../veto.service';

@Component({
  selector: 'app-veto-list',
  templateUrl: './veto-list.component.html',
  styleUrls: ['./veto-list.component.css']
})
export class VetoListComponent implements OnInit {
  public static suggestions: string[];
  isReadMore = true
  searchText;
  page: number = 1;
  size: number = 3;
  count: number = 0;
  
  query: Query = new Query();
  pages: Page[];
  veto: any[] = [];
  filterOpen: boolean = false;
  showText() {
     this.isReadMore = !this.isReadMore
  }
  vet: Veto = new Veto();
  constructor(private vetoService: VetoService, private route: ActivatedRoute, private imageService: ImageService) { }
  vett :Veto[];
  show : boolean;
  ngOnInit(): void {
    
  this.vetoService.getVeto().subscribe( list => this.veto = list )
  this.vetoService.count().subscribe(next => {
    this.count = next; this.generatePagination();
  });
  this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next ;
    this.veto.forEach(a=>this.imageService.getImage("VETO-"+a.id).subscribe(i=>a.image=i))
  }); 

  }
  filter() {
    this.filterOpen = !this.filterOpen;
  }
  next() {
    if(this.cantNext()){
      return;
    }
    this.page++;
      this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next ;
        this.veto.forEach(a=>this.imageService.getImage("VETO-"+a.id).subscribe(i=>a.image=i))
      });
      this.generatePagination();
    
  }

  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.page--;
      this.vetoService.getPagedVetos(this.page, this.size).subscribe(next =>  { this.veto = next ;
        this.veto.forEach(a=>this.imageService.getImage("VETO-"+a.id).subscribe(i=>a.image=i))
      });
      this.generatePagination();
  }
  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.page = Number(n.number);
      this.vetoService.getPagedVetos(this.page, this.size).subscribe(next =>  { this.veto = next ;
        this.veto.forEach(a=>this.imageService.getImage("VETO-"+a.id).subscribe(i=>a.image=i))
      });
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

    if (this.nbPages <= 3) {
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

//search bar
placeHolderSearchBar: string = 'Chercher partout : {Titre , Description ...}';
hideSearchBarResult: boolean = true;
searchBarResult: Veto[] = [];
searchcontent: string = '';


suggestions: string[] = VetoService.suggestions;
autoComplete: string[] = [];
autoC = true;
fetch(str: string) {
  if(str?.length == 0){
    this.ngOnInit();
    return;
  }
  if (str?.length > 3) {
    
    console.log(str)
   
    this.searchBarResult = [ ];
    this.vetoService.elasticSearch(str).subscribe(next =>  { this.veto = next ;
      this.veto.forEach(a=>this.imageService.getImage("VETO-"+a.id).subscribe(i=>a.image=i))
    });
    this.hideSearchBarResult = false;
  } else {
    this.hideSearchBarResult = true;
  }
}
respectCriteria(associationAsString: string, str: string): boolean {
  if (associationAsString.includes(str)) {
    console.log(associationAsString)
  }
  return associationAsString.includes(str);
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
