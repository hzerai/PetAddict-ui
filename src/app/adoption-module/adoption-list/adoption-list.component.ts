import { Component, OnInit } from '@angular/core';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrls: ['./adoption-list.component.css']
})
export class AdoptionListComponent implements OnInit {
  adoptions: Adoption[] = [];

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionService.getAdoptions().subscribe(next => this.adoptions = next);
  }

}
