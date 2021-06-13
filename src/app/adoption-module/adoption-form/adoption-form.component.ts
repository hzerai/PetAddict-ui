import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
import { Animals } from '../adoption/Animals';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';
import { Sexe } from '../adoption/Sexe';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { Tailles } from 'src/app/interface-module/filter/Tailles';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.css']
})
export class AdoptionFormComponent implements OnInit {
  animals = Object.values(Animals);
  colors = Object.values(Colors);
  tailles = Object.values(Tailles);
  breed = [];
  sexes = Object.values(Sexe);
  adoptionForm: FormGroup;
  adoption: Adoption = new Adoption();


  constructor(private adoptionService: AdoptionService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService) {
    if (tokenStorageService.getToken() == null) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.ac.queryParamMap.subscribe(next => next.has('adoption') ? this.adoption = JSON.parse(next.get('adoption')) : {});
    this.adoptionForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(),
      nom: new FormControl(),
      sexe: new FormControl(),
      type: new FormControl(),
      age: new FormControl(),
      taille: new FormControl(),
      couleur: new FormControl(),
      espece: new FormControl(),

    })

    if (this.adoption?.id) {
      this.adoptionForm.setValue({
        title: this.adoption.title,
        description: this.adoption.description,
        sexe: this.adoption.animal.sexe,
        type: this.adoption.animal.type,
        age: this.adoption.animal.age,
        espece: this.adoption.animal.espece,
        couleur: this.adoption.animal.couleur,
        taille: this.adoption.animal.taille,
        nom: this.adoption.animal.nom
      }); this.adoption = this.adoption;
      this.onSelectBreed(this.adoption.animal.espece);
    }

  }

  onSubmit() {
    this.adoption.title = this.adoptionForm.value.title
    this.adoption.description = this.adoptionForm.value.description
    this.adoption.animal.espece = this.adoptionForm.value.espece
    this.adoption.animal.sexe = this.adoptionForm.value.sexe
    this.adoption.animal.type = this.adoptionForm.value.type
    this.adoption.animal.age = this.adoptionForm.value.age
    this.adoption.animal.taille = this.adoptionForm.value.taille
    this.adoption.animal.couleur = this.adoptionForm.value.couleur
    this.adoption.animal.nom = this.adoptionForm.value.nom
    if (this.adoption.id) {
      //update
      this.adoptionService.updateAdoption(this.adoption)
        .subscribe(next => { this.adoption = next; this.router.navigate(["/adoptions/" + this.adoption.id], { queryParams: { adoption: JSON.stringify(this.adoption) } }) })
    } else {
      //create
      this.adoptionService.newAdoption(this.adoption)
        .subscribe(next => { this.adoption = next; this.router.navigate(["/adoptions/" + this.adoption.id], { queryParams: { adoption: JSON.stringify(this.adoption) } }) })
    }

  }
  onSelectBreed(b) {
    if (b == Animals.Chien) {
      this.breed = Object.values(DogBreed);
    } else if (b == Animals.Chat) {
      this.breed = Object.values(CatBreed);
    } else if (b == Animals.Cheval) {
      this.breed = Object.values(HorseBreed);
    } else {

    }
  }

}
