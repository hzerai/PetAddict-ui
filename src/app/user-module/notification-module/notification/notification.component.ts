import { AfterViewInit, Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ImageService } from 'src/app/images-module/image.service';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { User } from '../../User';
import { TokenStorageService } from '../../_services/token-storage.service';
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
export class NotificationComponent implements OnInit, AfterViewInit {

  private readonly notifier: NotifierService;
  currentUserName?: string;
  unreadNotif: number = 0;
  notifications: Notification[] = [];
  dropdownOpen: boolean = false;

  userMap = new Map();

  constructor(private tokenService: TokenStorageService, private ws: WebSocketService, private imageService: ImageService, private notificationService: NotificationService, private userService: UserService, private _eref: ElementRef, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngAfterViewInit(): void {
    const token = this.tokenService.getToken();
    if (token == null) {
      return null;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    this.currentUserName = JSON.parse(payload).username;
    this.ws.subscribe('notifications' + this.currentUserName, next => {
      let notif: Notification = JSON.parse(next.body);
      this.unreadNotif++;
      if (notif.body.includes('acc')) {
        this.notifier.notify('success', this.getFromUser(notif.fromUser) + ' ' + notif.body);
      } else if (notif.body.includes('rej')) {
        this.notifier.notify('error', this.getFromUser(notif.fromUser) + ' ' + notif.body);
      } else if (notif.body.includes('env')) {
        this.notifier.notify('info', this.getFromUser(notif.fromUser) + ' ' + notif.body);
      } else {
        this.notifier.notify('default', this.getFromUser(notif.fromUser) + ' ' + notif.body);
      }
      this.notifications.unshift(notif);
    })
  }

  ngOnInit(): void {

    this.notificationService.getAllNotifications().subscribe(next => {
      this.unreadNotif = next.length;
      this.notifications = next;
      next.forEach(notif => {
        this.userService.getUserById(notif.fromUser, null).subscribe(u => {
          this.userMap.set(u.email, u);
        })
      })
    });
  }

  getFromUser(email: string): string {
    let user = this.userMap.get(email);
    if (!user) {
      this.userService.getUserById(email, null).subscribe(u => {
        user = u;
        this.userMap.set(u.email, u);
      })
    }
    return `${user?.firstName} ${user?.lastName}`;
  }

  getUserImage(email: string) {
    let user = this.userMap.get(email);
    if (!user) {
      this.userService.getUserById(email, null).subscribe(u => {
        user = u;
        this.userMap.set(u.email, u);
      })
    }
    let url;
    this.imageService.getImage(`USER-${user.id}`).subscribe(next => next != null ? url = next.bytes : url = 'https://www.w3schools.com/howto/img_avatar.png');
    return url;
  }

  showNotifs() {
    if (this.unreadNotif === 0) {
      this.dropdownOpen = !this.dropdownOpen;
      return;
    }
    this.dropdownOpen = !this.dropdownOpen;
    this.unreadNotif = 0;
    this.notifications.forEach(n => {
      if (!n.id || n.vu) {
        return;
      }
      this.notificationService.readNotification(n.id).subscribe();
      n.vu = true;
    })
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target))
      this.dropdownOpen = false;
  }

}
