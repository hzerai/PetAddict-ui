import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adoption } from './Adoption';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {


  @Input() adoption: Adoption;
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getAdoption() {
    this.route.navigate(['/adoptions', this.adoption.id], { queryParams: { adoption: JSON.stringify(this.adoption) } })
  }

}
