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
  ages = ['Bébé', 'Junior', 'Adulte', 'Senior'];
  sexes = Object.values(Sexe);
  adoptionForm: FormGroup;
  adoption: Adoption = new Adoption();
  imageName: string;
  submitted: boolean = false;

  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor(private notifier: NotifierService, private ws: WebSocketService, private imageService: ImageService, private adoptionService: AdoptionService, private router: Router, private ac: ActivatedRoute, private tokenStorageService: TokenStorageService) {

  }

  ngOnInit(): void {
    if (!this.tokenStorageService.getToken()) {
      this.router.navigateByUrl("/login");
    }
    this.adoptionForm = new FormGroup({
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
      this.ac.data.subscribe((data) => {
        this.adoption = data.data.adoption;
        this.imageName = `ADOPTION-${data.data.adoption.id}`;
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
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.adoptionForm.invalid) {
      this.notifier.notify('error', 'Incomplete data.' , 'inc');
      return;
    } else if (!this.imageComponent.image?.bytes) {
      this.notifier.notify('error', 'You need to select an image for the animal.' , 'inc');
      return;
    }
    this.notifier.hide('inc');
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
      this.notifier.notify('default', 'Updating adoption. please wait ...', 'update');
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.adoptionService.updateAdoption(this.adoption).subscribe(next => {
        this.ws.push(next, 'adoptions');
        this.adoption = next;
        this.notifier.hide('update');
        this.notifier.notify('success', 'Adoption updated successfuly');
        this.router.navigateByUrl("/adoptions/" + this.adoption.id)
      })
    } else {
      //create
      this.notifier.notify('default', 'Creating adoption. please wait ...', 'create');
      this.adoptionService.newAdoption(this.adoption).subscribe(next => {
        this.ws.push(next, 'adoptions');
        this.imageComponent.autoUpload = true;
        this.imageComponent.imageName = `ADOPTION-${next.id}`;
        this.imageComponent.image.name = `ADOPTION-${next.id}`;
        this.imageComponent.uploadImage();
        this.adoption = next;
        this.notifier.hide('create');
        this.notifier.notify('success', 'Adoption created successfuly');
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

  // form controls getters
  get title() {
    return this.adoptionForm.get('title');
  }

  get description() {
    return this.adoptionForm.get('description');
  }

  get nom() {
    return this.adoptionForm.get('nom');
  }

  get age() {
    return this.adoptionForm.get('age');
  }

  get espece() {
    return this.adoptionForm.get('espece');
  }

}
