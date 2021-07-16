import { Component, Input, OnInit } from '@angular/core';
import { FoundService } from '../found/found.service';

@Component({
  selector: 'app-user-found-list',
  templateUrl: './user-found-list.component.html',
  styleUrls: ['./user-found-list.component.css']
})
export class UserFoundListComponent implements OnInit {
  founds: any[] = [];
  @Input() userName: string;

  constructor(private foundService: FoundService) { }

  ngOnInit(): void {
    this.foundService.getUserFounds().subscribe(next => {
      this.founds = next;
      this.founds.forEach(f => f.show = false)
    });


  }
  foundIsFound(found) {
    found.status = 'FOUND';
    this.foundService.updateFound(found).subscribe();
  }
  cancelFound(found) {
    found.status = 'CANCELED';
    this.foundService.updateFound(found).subscribe();
  }
  reopenFound(found) {
    found.status = 'CREATED';
    this.foundService.updateFound(found).subscribe();
  }



  getstatusColor(status) {
    if (status == 'CREATED') {
      return 'red';
    } else if (status == 'FOUND') {
      return 'green';
    } else {
      return 'gray';
    }
  }

}
