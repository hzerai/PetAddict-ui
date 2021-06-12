import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { Municipality, VillesService } from 'src/app/user-module/villes.service';
import { CatBreed } from './CatBreed';
import { Colors } from './Colors';
import { DogBreed } from './DogBreed';
import { HorseBreed } from './HorseBreed';
import { Query } from './Query';
import { Tailles } from './Tailles';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  animals = Object.values(Animals);
  colors = Object.values(Colors);
  tailles = Object.values(Tailles);
  breed = [];
  sexes = Object.values(Sexe);
  villes = VillesService.villes;
  municipalities: Municipality[];
  @Output() newQueryEvent = new EventEmitter<Query>();
  query: Query = new Query();
  adoptionFilter: FormGroup;
  constructor() {
    this.query.params.set('espece', '');
    this.query.params.set('type', '');
    this.query.params.set('taille', '');
    this.query.params.set('sexe', '');
    this.query.params.set('ville', '');
    this.query.params.set('municipality', '');
  }

  ngOnInit(): void {
    let espece = new FormControl();
    espece.setValue(this.query.params.get('espece'));
    let type = new FormControl();
    type.setValue(this.query.params.get('type'));
    let taille = new FormControl();
    taille.setValue(this.query.params.get('taille'));
    let ville = new FormControl();
    ville.setValue(this.query.params.get('ville'));
    let municipality = new FormControl();
    municipality.setValue(this.query.params.get('municipality'));
    let sexe = new FormControl();
    sexe.setValue(this.query.params.get('sexe'));


    this.adoptionFilter = new FormGroup({
      espece: espece,
      type: type,
      sexe: sexe,
      taille: taille,
      ville: ville,
      municipality: municipality
    })
  }

  // onSubmit() {
  //   this.title = this.adoptionFilter.value.title
  //   this.animal = this.adoptionFilter.value.animal
  //   // this.router.navigate(["/adoptions/filtered"], { queryParams: { page: 1, size: 8, title: this.title, animal: this.animal } })
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(["/adoptions"], { queryParams: { page: 1, size: 8, title: this.title, animal: this.animal } });
  //   });
  // }

  resetFilter() {
    this.query.params.set('espece', '');
    this.query.params.set('type', '');
    this.query.params.set('sexe', '');
    this.query.params.set('taille', '');
    this.query.params.set('ville', '');
    this.query.params.set('municipality', '');
    this.ngOnInit();
  }

  queryResult(query: Query) {
    this.query.params.set('espece', this.adoptionFilter.value['espece']);
    this.query.params.set('type', this.adoptionFilter.value['type']);
    this.query.params.set('sexe', this.adoptionFilter.value['sexe']);
    this.query.params.set('taille', this.adoptionFilter.value['taille']);
    this.query.params.set('ville', this.adoptionFilter.value['ville']);
    this.query.params.set('municipality', this.adoptionFilter.value['municipality']);
    this.newQueryEvent.emit(query);
  }

  onSelectVille(ville) {
    this.municipalities = this.villes.find(v => v?.name == ville)?.municipalities;
  }

  onSelectBreed(b) {
    if (b == Animals.Chien) {
      this.breed = Object.values(DogBreed);
    } else if (b == Animals.Chat) {
      this.breed = Object.values(CatBreed);
    } else if (b == Animals.Cheval) {
      this.breed = Object.values(HorseBreed);
    } else {
      this.breed = ['Autre']
    }
  }

}


