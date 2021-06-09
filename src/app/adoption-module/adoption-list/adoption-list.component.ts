import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {

  animal: string = '';
  title: string = '';
  page: number = 1;
  size: number = 8;
  count: number = 0;
  adoptions: Adoption[] = [];

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => this.count = next);
    this.route.queryParams
      .subscribe(params => {
        console.log(params)
        this.page = params.page ? Number(params.page) : this.page;
        this.size = params.size ? Number(params.size) : this.size;
        this.title = params.title ? params.title : this.title;
        this.animal = params.animal ? params.animal : this.animal;
      }
      );
    if (this.title.length > 0 || this.animal.length > 0) {
      this.adoptionService.getPagedAdoptionsFiltered(this.page, this.size, this.title, this.animal).subscribe(next => this.adoptions = next);
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
    }
  }

  next() {
    this.page++;
    if (this.title.length > 0 || this.animal.length > 0) {
      this.adoptionService.getPagedAdoptionsFiltered(this.page, this.size, this.title, this.animal).subscribe(next => this.adoptions = next);
    } else {
      this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
    }
  }

  previous() {
    this.page--;
    if (this.title.length > 0 || this.animal.length > 0) {
      this.adoptionService.getPagedAdoptionsFiltered(this.page, this.size, this.title, this.animal).subscribe(next => this.adoptions = next);
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

}
