import { Component, Input, OnInit } from '@angular/core';
import { Adoption } from 'src/app/adoption-module/adoption/Adoption';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  @Input() type: string = '';
  constructor(private adoptionService: AdoptionService) { }
  adoptions: Adoption[] = [];

  ngOnInit(): void {
    console.log(this.type)
    if (this.type == 'adoptions') {
      this.adoptionService.getPagedAdoptions(1, 3).subscribe(next => this.adoptions = next);
    }
  }

}
