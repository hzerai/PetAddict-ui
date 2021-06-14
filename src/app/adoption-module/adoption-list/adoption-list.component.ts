import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query } from 'src/app/interface-module/filter/Query';
import { VillesService } from 'src/app/user-module/villes.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
import { Animal } from '../adoption/Animal';
import { AnimalService } from '../adoption/animal.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {

  filtered: boolean = false;
  page: number = 1;
  size: number = 6;
  count: number = 0;
  adoptions: Adoption[] = [];
  query: Query = new Query();
  pages: Page[];

  filterOpen: boolean = false;

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute, private animalService: AnimalService) {
  }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => {
      this.count = next; this.generatePagination();
    });
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
  }
  populateSuggestions() {
    if (this.suggestions.indexOf('Tunis') < 0)
      Object.values(VillesService.villes).forEach(v => { this.suggestions.push(v.name); v.municipalities.forEach(k => this.suggestions.push(k.name)) })
  }
  filter() {
    this.filterOpen = !this.filterOpen;
  }

  next() {
    this.page++;
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  previous() {
    this.page--;
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  setPage(n: any) {
    this.page = Number(n);
    if (this.filtered) {
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
      this.generatePagination();
    }
  }

  cantPrevious(): boolean {
    return this.page < 2;
  }

  cantNext(): boolean {
    return (this.filtered && this.currentCount < this.size) || this.page >= this.nbPages;
  }

  queryResult(query: Query) {
    this.page = this.page < 0 ? 1 : this.page;
    this.query = query;
    this.filtered = true;
    this.nbPages = 1;
    this.getPagedAdoptionsFiltered();
  }

  getPagedAdoptionsFiltered() {
    let espece = this.query.params.get('espece');
    let type = this.query.params.get('type');
    let sexe = this.query.params.get('sexe');
    let taille = this.query.params.get('taille');
    let ville = this.query.params.get('ville');
    let size = this.query.params.get('size');
    let user_id = this.query.params.get('user_id');
    let municipality = this.query.params.get('municipality');
    this.size = size != null ? Number(size) : this.size;
    this.adoptionService.getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id, this.page, size).subscribe(next => { this.adoptions = next; this.currentCount = next.length; this.generatePagination(); });

  }

  resetPage(a: any) {
    this.page = 1;
    this.nbPages = 0;
  }
  private nbPages = 0;
  private currentCount = 6;
  generatePagination() {
    let pages: Page[] = [];
    if (this.filtered) {
      console.log('pages', this.nbPages, 'count', this.currentCount)
      this.nbPages = this.currentCount == this.size && this.page == this.nbPages ? this.nbPages + 1 : this.nbPages;

    } else {
      this.nbPages = Math.ceil(this.count / this.size)
    }
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
    this.populateSuggestions();
    if (str?.length > 3) {
      if (this.autoC) {
        this.autoComplete = [];
        this.autoComplete = this.suggestions.filter(v => {
          return v.toLowerCase().includes(str.toLowerCase())
        })
      }
      this.searchBarResult = [];
      AdoptionService.cache.adoptions.forEach((value, key, map) => {
        let localAdoption = (JSON.parse(JSON.stringify(value)));
        localAdoption.user.adoptions = null;
        localAdoption.user.adoptionRequests = null;
        localAdoption.adoptionRequests = null;
        localAdoption.animal.user = null;
        let adoptionAsString = JSON.stringify(localAdoption).toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
        if (this.respectCriteria(adoptionAsString, str.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))) {
          this.searchBarResult.push(value);
        }
      })
      this.hideSearchBarResult = false;
    } else {
      this.hideSearchBarResult = true;
    }
  }
  respectCriteria(adoptionAsString: string, str: string): boolean {
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