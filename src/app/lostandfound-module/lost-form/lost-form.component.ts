import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { ImageService } from 'src/app/images-module/image.service';
import { ImageComponent } from 'src/app/images-module/image/image.component';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { Lost } from '../lost/Lost';
import { LostService } from '../lost/lost.service';

@Component({
  selector: 'app-lost-form',
  templateUrl: './lost-form.component.html',
  styleUrls: ['./lost-form.component.css']
})
export class LostFormComponent implements OnInit {

  animals = Object.values(Animals);
  colors = Object.values(Colors);
  tailles = Object.values(Tailles);
  breed = [];
  sexes = Object.values(Sexe);
  lostForm: FormGroup;
  lost: Lost = new Lost();
  imageName: string;
  submitted: boolean = false;


  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor(private notifier: NotifierService,private imageService: ImageService, private lostService: LostService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    this.lostForm = new FormGroup({
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
      this.imageName = `Lost-${id}`;
      this.lostService.getLostById(id).subscribe(next => {
        this.lostForm.setValue({
          title: next.title,
          description: next.description,
          sexe: next.animal.sexe,
          type: next.animal.type,
          age: next.animal.age,
          espece: next.animal.espece,
          couleur: next.animal.couleur,
          taille: next.animal.taille,
          nom: next.animal.nom
        }); this.lost = next;
        this.onSelectBreed(next.animal.espece);
      })
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.lostForm.invalid) {
      this.notifier.notify('error', 'Incomplete data.');
      return;
    } else if (!this.imageComponent.image?.bytes) {
      this.notifier.notify('error', 'You need to select an image for the animal.');
      return;
    }
    this.lost.title = this.lostForm.value.title
    this.lost.description = this.lostForm.value.description
    this.lost.animal.espece = this.lostForm.value.espece
    this.lost.animal.sexe = this.lostForm.value.sexe
    this.lost.animal.type = this.lostForm.value.type
    this.lost.animal.age = this.lostForm.value.age
    this.lost.animal.taille = this.lostForm.value.taille
    this.lost.animal.couleur = this.lostForm.value.couleur
    this.lost.animal.nom = this.lostForm.value.nom
    if (this.lost.id) {
       //update
       this.notifier.notify('default', 'Updating lost. please wait ...', 'update');
       this.imageComponent.autoUpload = true;
       this.imageComponent.uploadImage();
       this.lostService.updateLost(this.lost).subscribe(next => {
         this.lost = next;
         this.notifier.hide('update');
         this.notifier.notify('success', 'Found lost successfuly');
         this.router.navigateByUrl("/losts/" + this.lost.id)
       })
     } else {
       //create
       this.notifier.notify('default', 'Creating lost. please wait ...', 'create');
       this.lostService.newLost(this.lost).subscribe(next => {
         this.imageComponent.autoUpload = true;
         this.imageComponent.imageName = `Lost-${next.id}`;
         this.imageComponent.image.name = `Lost-${next.id}`;
         this.imageComponent.uploadImage();
         this.lost = next;
         this.notifier.hide('create');
         this.notifier.notify('success', 'Lost created successfuly');
         this.router.navigateByUrl("/losts/" + this.lost.id)
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
    return this.lostForm.get('title');
  }

  get description() {
    return this.lostForm.get('description');
  }

  get nom() {
    return this.lostForm.get('nom');
  }

  get age() {
    return this.lostForm.get('age');
  }

  get espece() {
    return this.lostForm.get('espece');
  }


}
