import { Component, Input, OnInit } from '@angular/core';
import { Adoption } from '../adoption/Adoption';

@Component({
  selector: 'app-received-adoption',
  templateUrl: './received-adoption.component.html',
  styleUrls: ['./received-adoption.component.css']
})
export class ReceivedAdoptionComponent implements OnInit {

  @Input() receivedAdoptionRequests : Adoption[];
  constructor() { }

  ngOnInit(): void {
  }

}
