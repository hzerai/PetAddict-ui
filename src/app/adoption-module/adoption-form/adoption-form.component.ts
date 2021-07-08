import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ImageService } from 'src/app/images-module/image.service';
import { ImageComponent } from 'src/app/images-module/image/image.component';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { NotifierService } from 'angular-notifier';

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
  imageName: string;

  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor(private notifier: NotifierService, private ws: WebSocketService, private imageService: ImageService, private adoptionService: AdoptionService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
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
    let id;
    this.ac.params.subscribe(next => id = next.id)

    if (id) {
      this.imageName = `ADOPTION-${id}`;
      this.adoptionService.getAdoptionById(id,null).subscribe(next => {
        this.adoptionForm.setValue({
          title: next.title,
          description: next.description,
          sexe: next.animal.sexe,
          type: next.animal.type,
          age: next.animal.age,
          espece: next.animal.espece,
          couleur: next.animal.couleur,
          taille: next.animal.taille,
          nom: next.animal.nom
        }); this.adoption = next;
        this.onSelectBreed(next.animal.espece);
      })
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
      this.notifier.notify('default' , 'Updating adoption. please wait ...' , 'update');
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.adoptionService.updateAdoption(this.adoption).subscribe(next => {
        this.ws.push(next, 'adoptions');
        this.adoption = next;
        this.notifier.hide('update');
        this.notifier.notify('success' , 'Adoption updated successfuly');
        this.router.navigateByUrl("/adoptions/" + this.adoption.id)
      })
    } else {
      //create
      this.notifier.notify('default' , 'Creating adoption. please wait ...' , 'create');
      this.adoptionService.newAdoption(this.adoption).subscribe(next => {
        this.ws.push(next, 'adoptions');
        this.imageComponent.autoUpload = true;
        this.imageComponent.imageName = `ADOPTION-${next.id}`;
        this.imageComponent.image.name = `ADOPTION-${next.id}`;
        this.imageComponent.uploadImage();
        this.adoption = next;
        this.notifier.hide('create');
        this.notifier.notify('success' , 'Adoption created successfuly');
        this.router.navigateByUrl("/adoptions/" + this.adoption.id)
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

}
