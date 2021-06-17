import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Notification } from '../Notification';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  unreadNotif: number = 0;
  notifications: Notification[] = [];
  dropdownOpen: boolean = false;
  constructor(private notificationService: NotificationService, private userService: UserService) { }

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

  showNotifs(){
    this.dropdownOpen = !this.dropdownOpen;
    this.notifications.forEach(n => {this.notificationService.readNotification(n.id).subscribe(no => {}); this.unreadNotif = 0 ;})
  }

}
