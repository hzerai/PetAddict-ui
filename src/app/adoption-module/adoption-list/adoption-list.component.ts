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

  filtered : boolean= false;
  page: number = 1;
  size: number = 8;
  count: number = 0;
  adoptions: Adoption[] = [];
  query: Query = new Query();

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
  }

  next() {
    this.page++;
    if (this.filtered) {
      this.query.params.set('page' , this.page)
      this.queryResult(this.query)
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
    }
  }

  previous() {
    this.page--;
    if (this.filtered) {
      this.query.params.set('page' , this.page)
      this.queryResult(this.query)
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
    }
  }

  cantPrevious(): boolean {
    return this.page == 1;
  }

  cantNext(): boolean {
    return (this.page * this.size) > this.count;
  }

  queryResult(query: Query) {
    this.query = query;
    let espece = this.query.params.get('espece');
    let type = this.query.params.get('type');
    let sexe = this.query.params.get('sexe');
    let taille = this.query.params.get('taille');
    let ville = this.query.params.get('ville');
    let page = this.query.params.get('page');
    let user_id = this.query.params.get('user_id');
    let municipality = this.query.params.get('municipality');
    this.adoptionService.getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id , page).subscribe(next => this.adoptions = next);
    this.filtered = true;
    console.log(query)
  }

}
