import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { ImageComponent } from 'src/app/images-module/image/image.component';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { Found } from '../found/found';
import { ImageService } from 'src/app/images-module/image.service';
import { FoundService } from '../found/found.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../user-module/_services/token-storage.service';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { NotifierService } from 'angular-notifier';




@Component({
  selector: 'app-found-form',
  templateUrl: './found-form.component.html',
  styleUrls: ['./found-form.component.css']
})
export class FoundFormComponent implements OnInit {

  animals = Object.values(Animals);
  colors = Object.values(Colors);
  tailles = Object.values(Tailles);
  breed = [];
  sexes = Object.values(Sexe);
  foundForm: FormGroup;
  found: Found = new Found();
  imageName: string;
  submitted: boolean = false;

  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor( private notifier: NotifierService, private imageService: ImageService, private foundService: FoundService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    this.foundForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      nom: new FormControl(null, Validators.minLength(3)),
      sexe: new FormControl(),
      type: new FormControl(),
      age: new FormControl(null),
      taille: new FormControl(),
      couleur: new FormControl(),
      espece: new FormControl(null, Validators.required),

    })
    let id;
    this.ac.params.subscribe(next => id = next.id)

    if (id) {
      this.imageName = `Found-${id}`;
      this.foundService.getFoundById(id).subscribe(next => {
        this.foundForm.setValue({
          title: next.title,
          description: next.description,
          sexe: next.animal.sexe,
          type: next.animal.type,
          age: next.animal.age,
          espece: next.animal.espece,
          couleur: next.animal.couleur,
          taille: next.animal.taille,
          nom: next.animal.nom
        }); this.found = next;
        this.onSelectBreed(next.animal.espece);
      })
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.foundForm.invalid) {
      this.notifier.notify('error', 'Incomplete data.');
      return;
    } else if (!this.imageComponent.image?.bytes) {
      this.notifier.notify('error', 'You need to select an image for the animal.');
      return;
    }
    this.found.title = this.foundForm.value.title
    this.found.description = this.foundForm.value.description
    this.found.animal.espece = this.foundForm.value.espece
    this.found.animal.sexe = this.foundForm.value.sexe
    this.found.animal.type = this.foundForm.value.type
    this.found.animal.age = this.foundForm.value.age
    this.found.animal.taille = this.foundForm.value.taille
    this.found.animal.couleur = this.foundForm.value.couleur
    this.found.animal.nom = this.foundForm.value.nom
    if (this.found.id) {
      //update
      this.notifier.notify('default', 'Updating found. please wait ...', 'update');
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.foundService.updateFound(this.found).subscribe(next => {
        this.found = next;
        this.notifier.hide('update');
        this.notifier.notify('success', 'Found updated successfuly');
        this.router.navigateByUrl("/founds/" + this.found.id)
      })
    } else {
      //create
      this.notifier.notify('default', 'Creating found. please wait ...', 'create');
      this.foundService.newFound(this.found).subscribe(next => {
        this.imageComponent.autoUpload = true;
        this.imageComponent.imageName = `Found-${next.id}`;
        this.imageComponent.image.name = `Found-${next.id}`;
        this.imageComponent.uploadImage();
        this.found = next;
        this.notifier.hide('create');
        this.notifier.notify('success', 'Found created successfuly');
        this.router.navigateByUrl("/founds/" + this.found.id)
      })
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
  // form controls getters
  get title() {
    return this.foundForm.get('title');
  }

  get description() {
    return this.foundForm.get('description');
  }

  get nom() {
    return this.foundForm.get('nom');
  }

  get age() {
    return this.foundForm.get('age');
  }

  get espece() {
    return this.foundForm.get('espece');
  }

}
