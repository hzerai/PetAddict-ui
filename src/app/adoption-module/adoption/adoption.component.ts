import { Component, Input, OnInit } from '@angular/core';
import { Adoption } from './Adoption';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {

 
  @Input() adoption: Adoption;
  constructor() { }

  ngOnInit(): void {
    console.log(this.adoption);
  }

}
