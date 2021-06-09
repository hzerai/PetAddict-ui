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

  page: number = 1;
  size: number = 8;
  count: number = 0;
  adoptions: Adoption[] = [];

  constructor(private adoptionService: AdoptionService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.adoptionService.count().subscribe(next => this.count = next);
    this.route.queryParams
      .subscribe(params => {
        this.page = params.page ? Number(params.page) : this.page;
        this.size = params.size ? Number(params.size) : this.size;
      }
      );
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
  }

  next() {
    this.page++;
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
  }

  previous() {
    this.page--;
    this.adoptionService.getPagedAdoptions(this.page, this.size).subscribe(next => this.adoptions = next);
  }

  cantPrevious(): boolean {
    return this.page == 1;
  }

  cantNext(): boolean {
    return (this.page * this.size) > this.count;
  }

}
