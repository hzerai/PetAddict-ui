import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { Address } from '../Address';
import { User } from '../User';
import { UserService } from '../_services/user.service';
import { formatDate } from '@angular/common'
import { Municipality, VillesService } from '../villes.service';
import { NotifierService } from 'angular-notifier';


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

  constructor(private notifier: NotifierService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.user.address == null) {
      this.user.address = new Address();
    }
    this.userForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      phoneNumber:new FormControl(null, [Validators.pattern('[0-9]{8}'), Validators.minLength(8), Validators.maxLength(8)]),
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
      lastName: this.user.lastName,
      firstName: this.user.firstName,
      phoneNumber: this.user.phoneNumber,
      birthDate: formatDate(this.user.birthDate, 'yyyy-MM-dd', 'en'),
      sexe: this.user.sexe,
      favoriteAnimal: this.user.favoriteAnimal,
      isMailPublic: this.user.isMailPublic,
      isPhonePublic: this.user.isPhonePublic,
      allowNotification: this.user.allowNotification,
      municipality: this.user.address?.municipality,
      details: this.user.address?.details,
      ville: this.user.address?.ville,
      about: this.user.about
    })
    this.onSelect(this.user.address?.ville);
  }

  saveProfile() {
    if (this.userForm.invalid) {
      this.notifier.notify('error', 'Incomplete data.' , 'inc');
      return;
    }
    this.notifier.hide('inc');
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

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }

}
