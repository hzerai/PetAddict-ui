import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
import { Animals } from '../adoption/Animals';


@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {
  animals = Object.values(Animals);
  adoptionForm: FormGroup;
  adoption: Adoption = new Adoption();


  constructor(private adoptionService: AdoptionService, private router: Router, private ac: ActivatedRoute) { }

  ngOnInit(): void {
    this.adoptionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      animal: new FormControl(null, Validators.required)
    })
    let id;
    this.ac.params.subscribe(next => id = next.id)

    if (id) {
      this.adoptionService.getAdoptionById(id).subscribe(next => {
        this.adoptionForm.setValue({
          title: next.title, description: next.description, animal: next.animal
        }); this.adoption = next;
      })

    }


  }

  onSubmit() {
    this.adoption.title = this.adoptionForm.value.title
    this.adoption.description = this.adoptionForm.value.description
    this.adoption.animal = this.adoptionForm.value.animal
    if (this.adoption.id) {
      //update
      this.adoptionService.updateAdoption(this.adoption).subscribe(next => { this.adoption = next; this.router.navigateByUrl("/adoptions/" + this.adoption.id) })
    } else {
      //create
      this.adoptionService.newAdoption(this.adoption).subscribe(next => { this.adoption = next; this.router.navigateByUrl("/adoptions/" + this.adoption.id) })
    }

  }

}
