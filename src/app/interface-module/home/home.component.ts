import { Component, OnInit } from '@angular/core';
import { Adoption } from 'src/app/adoption-module/adoption/Adoption';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  adoptions: Adoption[] = [];

  constructor(private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionService.getPagedAdoptions(1, 3).subscribe(next => this.adoptions = next);

  }

}
