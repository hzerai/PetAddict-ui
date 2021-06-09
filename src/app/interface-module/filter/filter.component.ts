import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animals } from 'src/app/adoption-module/adoption/Animals';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  animals = Object.values(Animals);
  @Input() title: string = '';
  @Input() animal: string = '';
  adoptionFilter: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    let tf = new FormControl();
    tf.setValue(this.title);
    let af = new FormControl();
    af.setValue(this.animal);

    this.adoptionFilter = new FormGroup({
      title: tf,
      animal: af
    })
  }

  onSubmit() {
    this.title = this.adoptionFilter.value.title
    this.animal = this.adoptionFilter.value.animal
    // this.router.navigate(["/adoptions/filtered"], { queryParams: { page: 1, size: 8, title: this.title, animal: this.animal } })
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/adoptions"], { queryParams: { page: 1, size: 8, title: this.title, animal: this.animal } });
    });
  }

  resetFilter() {
    this.adoptionFilter.value.title = '';
    this.adoptionFilter.value.animal = '';
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/adoptions"]);
    });
  }

}
