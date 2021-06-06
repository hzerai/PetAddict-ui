import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() count: number;
  @Input() size: number;
  @Input() page: number;

  nbrPages: any[] = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= Math.floor(this.count / this.size); i++) {
      this.nbrPages.push(i)
    }
    if(this.nbrPages.length > 6){
      this.nbrPages = this.nbrPages.splice(this.nbrPages.length-3 , 3)
      this.nbrPages.unshift(1,2,3,'. . . .')
    }
  }

}
