import { Component, Input, OnInit } from '@angular/core';
import { LostService } from '../lost/lost.service';

@Component({
  selector: 'app-user-lost-list',
  templateUrl: './user-lost-list.component.html',
  styleUrls: ['./user-lost-list.component.css']
})
export class UserLostListComponent implements OnInit {
  losts: any[] = [];
  @Input() userName: string;

  constructor(private lostService: LostService) { }

  ngOnInit(): void {
    this.lostService.getUserLosts().subscribe(next => {
      this.losts = next;
      this.losts.forEach(f => f.show = false)
    });


  }
  lostIsFound(lost) {
    lost.status = 'FOUND';
    this.lostService.updateLost(lost).subscribe();
  }
  cancelLost(lost) {
    lost.status = 'CANCELED';
    this.lostService.updateLost(lost).subscribe();
  }
  reopenLost(lost) {
    lost.status = 'CREATED';
    this.lostService.updateLost(lost).subscribe();
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
