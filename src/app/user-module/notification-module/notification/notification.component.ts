import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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
  private readonly notifier: NotifierService;

  unreadNotif: number = 0;
  notifications: Notification[] = [];
  dropdownOpen: boolean = false;
  constructor(private imageService: ImageService, private notificationService: NotificationService, private userService: UserService, private _eref: ElementRef, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;

  }
  @Input() currentUserName: string;

  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe(next => {
      this.unreadNotif = next.filter(n => !n.vu).length;
      this.notifications = next
    });
    this.streamNewNotifications();
  }

  getFromUser(email: string): string {
    let userName = '';
    this.userService.getUserById(email).subscribe(u => userName = `${u.firstName} ${u.lastName}`)
    return userName;
  }

  getUserImage(email: string) {
    let user: User;
    let url;
    this.userService.getUserById(email).subscribe(u => user = u);
    this.imageService.getImage(`USER-${user.id}`).subscribe(next => next != null ? url = next.bytes : url = 'https://www.w3schools.com/howto/img_avatar.png');
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

  streamNewNotifications() {
    setTimeout(() => {
      if (this.currentUserName)
        this.notificationService.notificationsStream(this.currentUserName).subscribe(next => {
          if (next) {
            this.unreadNotif++;
            next.forEach(notif => {
              if (notif.body.includes('acc')) {
                this.notifier.notify('success', this.getFromUser(notif.fromUser) + ' a ' + notif.body);
              } else if (notif.body.includes('rej')) {
                this.notifier.notify('error', this.getFromUser(notif.fromUser) + ' a ' + notif.body);
              } else if (notif.body.includes('env')) {
                this.notifier.notify('info', this.getFromUser(notif.fromUser) + ' a ' + notif.body);
              } else {
                this.notifier.notify('default', this.getFromUser(notif.fromUser) + ' a ' + notif.body);
              }
              this.notifications.unshift(notif);
            });
          }
        })
      this.streamNewNotifications();
    }, 2000);
  }

}
