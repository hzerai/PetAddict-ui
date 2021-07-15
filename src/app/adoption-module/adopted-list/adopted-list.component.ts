import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { Query } from 'src/app/interface-module/filter/Query';
import { VillesService } from 'src/app/user-module/villes.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
import { Animal } from '../adoption/Animal';
import { AnimalService } from '../adoption/animal.service';


@Component({
  selector: 'app-adopted-list',
  templateUrl: './adopted-list.component.html',
  styleUrls: ['./adopted-list.component.css']
})
export class AdoptedListComponent implements OnInit {

  filtered: boolean = true;
  page: number = 1;
  size: number = 6;
  count: number = 0;
  adoptions: Adoption[] = [];
  query: Query = new Query();
  pages: Page[];
  specials: boolean = false;
  coeur: boolean = false;
  coupDeCoeur: Adoption;

  filterOpen: boolean = false;

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute, private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.getPagedAdoptionsFiltered();
  }


  next() {
    if (this.cantNext()) {
      return;
    }
    this.page++;
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size, null).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  previous() {
    if (this.cantPrevious()) {
      return;
    }
    this.page--;
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size, null).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  setPage(n: any) {
    if (n.middle) {
      return;
    }
    this.page = Number(n.number);
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size, null).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  cantPrevious(): boolean {
    return this.page < 2;
  }

  cantNext(): boolean {
    return this.page >= this.nbPages;
  }

  queryResult(query: Query) {
    this.page = this.page < 0 ? 1 : this.page;
    this.query = query;
    this.filtered = true;
    this.getPagedAdoptionsFiltered();
  }

  getPagedAdoptionsFiltered() {

    this.adoptionService.countFiltered(null, null, null, null, null, null, null, null, null, null, 'ADOPTED').subscribe(c => {
      this.count = c;
      this.generatePagination();
    });
    this.adoptionService.getPagedAdoptionsFiltered(null, null, null, null, null, null, null, this.page, this.size, null, null, null, 'ADOPTED', null).subscribe(next => { this.adoptions = next; });

  }

  resetPage(a: any) {
    this.page = 1;
    this.nbPages = 0;
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


  //search bar
  placeHolderSearchBar: string = 'Chercher partout : {Espece , Race , Taille, couleur, ville ...}';
  hideSearchBarResult: boolean = true;
  searchBarResult: Adoption[] = [];
  searchcontent: string = '';


  suggestions: string[] = AdoptionService.suggestions;;
  autoComplete: string[] = [];
  autoC = true;

  fetch(str: string) {
    if (str?.length > 3) {
      if (this.autoC) {
        this.autoComplete = [];
        this.autoComplete = this.suggestions.filter(v => {
          return v.toLowerCase().includes(str.toLowerCase())
        })
      }
      this.autoC = true;
      this.searchBarResult = [];
      this.adoptionService.elasticSearch(str).subscribe(next => this.searchBarResult = next, () => {
        this.autoC = false;
      });
      this.hideSearchBarResult = false;
    } else {
      this.hideSearchBarResult = true;
    }
  }

  respectCriteria(adoptionAsString: string, str: string): boolean {
    if (adoptionAsString.includes(str)) {
      console.log(adoptionAsString)
    }
    return adoptionAsString.includes(str);
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