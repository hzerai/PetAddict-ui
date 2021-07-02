import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/images-module/image.service';
import { User } from '../../User';
import { UserService } from '../../_services/user.service';
import { Notification } from '../Notification';
import { NotificationService } from '../notification.service';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  unreadNotif: number = 0;
  notifications: Notification[] = [];
  dropdownOpen: boolean = false;
  constructor(private imageService: ImageService, private notificationService: NotificationService, private userService: UserService, private _eref: ElementRef, private router: Router) { }

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe(next => {
      this.unreadNotif = next.filter(n => !n.vu).length;
      this.notifications = next
    });
  }

  getFromUser(email: string): string {
    let userName = '';
    this.userService.getUserById(email).subscribe(u => userName = `${u.firstName} ${u.lastName}`)
    return userName;
  }

  getUserImage(email : string){
    let user : User;
    let url ;
    this.userService.getUserById(email).subscribe(u => user=u);
    this.imageService.getImage(`USER-${user.id}`).subscribe(next =>  next != null ? url = next.bytes : url = 'https://www.w3schools.com/howto/img_avatar.png' );
    return url;
  }

  showNotifs() {
    this.dropdownOpen = !this.dropdownOpen;
    this.notifications.forEach(n => { this.notificationService.readNotification(n.id).subscribe(no => { }); this.unreadNotif = 0; })
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target))
      this.dropdownOpen = false;
  }

}
