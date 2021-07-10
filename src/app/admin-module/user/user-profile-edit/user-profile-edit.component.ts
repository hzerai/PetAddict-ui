import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { formatDate } from '@angular/common'
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/user-module/User';
import { Municipality, VillesService } from 'src/app/user-module/villes.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Address } from 'src/app/user-module/Address';


@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  @Input() showModal = false;
  @Input() user: User;
  @Output() userEvent = new EventEmitter<User>();
  userForm: FormGroup;
  animals = Object.values(Animals);
  sexes = Object.values(Sexe);
  villes = VillesService.villes;
  municipalities: Municipality[];

  constructor( private ac: ActivatedRoute,private notifier: NotifierService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    let id;
    this.ac.params.subscribe(next => {
      id = next.id;
      this.userService.getUserById(next.id,null).subscribe(a=>{
      
    if (a.address == null) {
      a.address = new Address();
    }
    this.userForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      phoneNumber: new FormControl(),
      birthDate: new FormControl(),
      sexe: new FormControl(),
      favoriteAnimal: new FormControl(),
      isMailPublic: new FormControl(),
      isPhonePublic: new FormControl(),
      allowNotification: new FormControl(),
      ville: new FormControl(),
      municipality: new FormControl(),
      details: new FormControl(),
      about: new FormControl(),
    });
    this.userForm.setValue({
      lastName: a.lastName,
      firstName: a.firstName,
      phoneNumber: a.phoneNumber,
      birthDate: formatDate(a.birthDate, 'yyyy-MM-dd', 'en'),
      sexe: a.sexe,
      favoriteAnimal: a.favoriteAnimal,
      isMailPublic: a.isMailPublic,
      isPhonePublic: a.isPhonePublic,
      allowNotification: a.allowNotification,
      municipality: a.address?.municipality,
      details: a.address?.details,
      ville: a.address?.ville,
      about: a.about
    })
    this.onSelect(a.address?.ville);
    this.user=a;
  })
})
  }

  saveProfile() {
    this.notifier.notify('default', 'Updating profile. please wait ...', 'profile');
    this.user.firstName = this.userForm.value.firstName
    this.user.lastName = this.userForm.value.lastName
    this.user.phoneNumber = this.userForm.value.phoneNumber
    this.user.birthDate = this.userForm.value.birthDate
    this.user.sexe = this.userForm.value.sexe
    this.user.favoriteAnimal = this.userForm.value.favoriteAnimal
    this.user.isMailPublic = this.userForm.value.isMailPublic
    this.user.isPhonePublic = this.userForm.value.isPhonePublic
    this.user.allowNotification = this.userForm.value.allowNotification
    this.user.address.municipality = this.userForm.value.municipality
    this.user.address.details = this.userForm.value.details
    this.user.address.ville = this.userForm.value.ville
    this.user.about = this.userForm.value.about
    this.userService.updateUserProfile(this.user).subscribe(a => {
      this.notifier.hide('profile');
      this.notifier.notify('success', 'Profile updated successfuly');
      this.userEvent.emit(this.user);
    })

  }

  onSelect(ville) {
    this.municipalities = this.villes.find(v => v?.name == ville)?.municipalities;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
