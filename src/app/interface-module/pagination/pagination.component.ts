import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  @Input() page: number = 1;
  @Input() size: number = 8;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  next() {
    this.page++;
    // this.router.navigateByUrl('/adoptions', { queryParams: { page: this.page, size: this.size }, skipLocationChange: true });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/adoptions'], { queryParams: { page: this.page, size: this.size }, skipLocationChange: true });
    });
  }

  previous() {
    this.page--;
    // this.router.navigateByUrl('/adoptions', { queryParams: { page: this.page, size: this.size }, skipLocationChange: true });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/adoptions'], { queryParams: { page: this.page, size: this.size }, skipLocationChange: true });
    });
  }

  cantPaginate(): boolean {
    return this.page == 1;
  }

}
