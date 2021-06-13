import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Query } from 'src/app/interface-module/filter/Query';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {

  filtered: boolean = false;
  page: number = 0;
  size: number = 6;
  count: number = 0;
  adoptions: Adoption[] = [];
  query: Query = new Query();

  filterOpen: boolean = false;

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.page++;
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
  }
  filter() {
    this.filterOpen = !this.filterOpen;
  }

  next() {
    this.page++;
    if (this.filtered) {
      this.query.params.set('page', this.page)
      this.query.params.set('size', this.size)
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
    }
  }

  previous() {
    this.page--;
    if (this.filtered) {
      this.query.params.set('page', this.page)
      this.query.params.set('size', this.size)
      this.getPagedAdoptionsFiltered()
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => { this.adoptions = next });
    }
  }

  cantPrevious(): boolean {
    return false;
  }

  cantNext(): boolean {
    return false;
  }

  queryResult(query: Query) {
    this.query = query;
    this.filtered = true;
    this.getPagedAdoptionsFiltered();
  }

  getPagedAdoptionsFiltered() {
    let espece = this.query.params.get('espece');
    let type = this.query.params.get('type');
    let sexe = this.query.params.get('sexe');
    let taille = this.query.params.get('taille');
    let ville = this.query.params.get('ville');
    let page = this.query.params.get('page');
    let size = this.query.params.get('size');
    let user_id = this.query.params.get('user_id');
    let municipality = this.query.params.get('municipality');
    this.adoptionService.getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id, page, size).subscribe(next => { this.adoptions = next });
  }

  resetPage(a: any) {
    this.page = 0;
    this.count = 0;
  }


}
