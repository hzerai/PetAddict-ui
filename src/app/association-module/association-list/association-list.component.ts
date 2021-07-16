import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Association } from '../Association';
import { AssociationService } from '../association.service';
import { Query } from 'src/app/interface-module/filter/Query';
import { ImageService } from 'src/app/images-module/image.service';



@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css']
})
export class AssociationListComponent implements OnInit {
  searchText;
  page: number = 1;
  size: number = 3;
  count: number = 0;
  asso: any[] = [];
  query: Query = new Query();
  pages: Page[];
  isReadMore = true
  filterOpen: boolean = false;

  showText() {
     this.isReadMore = !this.isReadMore
  }
  association: Association = new Association();
  constructor(private associationService: AssociationService, private route: ActivatedRoute, private imageService: ImageService) { }
  ass :Association[];
  show : boolean;
  ngOnInit(): void {
  
  this.associationService.count().subscribe(next => {
    this.count = next; this.generatePagination();
  });
  this.associationService.getPagedAssociations(this.page, this.size).subscribe(next => { this.asso = next ;
  this.asso.forEach(a=>this.imageService.getImage("ASSOCIATION-"+a.id).subscribe(i=>a.image=i))
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
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next =>  { this.asso = next ;
        this.asso.forEach(a=>this.imageService.getImage("ASSOCIATION-"+a.id).subscribe(i=>a.image=i))
        });
      this.generatePagination();
    
  }
  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.page--;
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next =>  { this.asso = next ;
        this.asso.forEach(a=>this.imageService.getImage("ASSOCIATION-"+a.id).subscribe(i=>a.image=i))
        });
      this.generatePagination();
  }
  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.page = Number(n.number);
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next =>  { this.asso = next ;
        this.asso.forEach(a=>this.imageService.getImage("ASSOCIATION-"+a.id).subscribe(i=>a.image=i))
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
placeHolderSearchBar: string = 'Chercher partout : {Titre , Description ....}';
hideSearchBarResult: boolean = true;
searchBarResult: Association[] = [];
searchcontent: string = '';


suggestions: string[] = AssociationService.suggestions;;
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
    this.associationService.elasticSearch(str).subscribe(next =>  { this.asso = next ;
      this.asso.forEach(a=>this.imageService.getImage("ASSOCIATION-"+a.id).subscribe(i=>a.image=i))
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
