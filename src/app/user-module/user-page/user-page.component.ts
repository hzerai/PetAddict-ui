import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionRequest } from 'src/app/adoption-module/adoption-request/AdoptionRequest';
import { AdoptionService } from 'src/app/adoption-module/adoption/adoption.service';
import { Inbox } from '../messages-module/Inbox';
import { MessageService } from '../messages-module/message.service';
import { Notification } from '../notification-module/Notification';
import { NotificationService } from '../notification-module/notification.service';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  child: string = 'profile';
  receivedAdoptionRequests: any[] = [];
  specialAdoptionRequest = -1;
  specialAdoptionRequestSender = -1;
  cameFromNotif = false;
  constructor(private notifService: NotificationService, private adoptionService: AdoptionService, private _eref: ElementRef, private route: ActivatedRoute, private messages: MessageService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  user: User;
  inbox: Inbox = new Inbox();
  contacts: User[] = [];
  unreadMessages: number = 0;
  ngOnInit(): void {
    let id;
    let u;
    let section;
    this.route.queryParamMap.subscribe(next => {
      id = next.get('id');
      section = next.get('section'); 
      u = next.get('u');
      if (section != null) {
        this.child = section;
        this.cameFromNotif = true;
        if (id != null) {
          this.specialAdoptionRequest = Number(id);
          this.specialAdoptionRequestSender = Number(u);
        }
      }
    });

    const token = this.tokenStorageService.getToken();
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      next.adoptions.forEach(a => a.adoptionRequests.forEach(r => { r.adoption = a; let m: any = r; m.show = false; this.receivedAdoptionRequests.push(m) }))
      this.user = next;
    })
    this.messages.getAllMessages().subscribe(next => {
      Object.assign(this.inbox, next);
      this.createContactList(this.inbox);
    })
  }
  createContactList(inbox: Inbox) {
    Object.keys(inbox.messagesByUser).forEach((k) => {
      inbox.messagesByUser[k].forEach(m => {
        if (!m.vu && m.toUser == this.user?.email) {
          this.unreadMessages++;
        }
      })
      this.userService.getUserById(k).subscribe(next => this.contacts.push(next))
    })
  }
  onClick(event) {
    if (this._eref.nativeElement.contains(event.target))
      this.specialAdoptionRequest = -1;
  }

  acceptAdoptionRequest(adoptionRequest: AdoptionRequest) {
    adoptionRequest.status = 'ACCEPTED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.user.email;
    notification.body = 'a rejeté votre demande d\'adoption';
    notification.route = '/user_profile#adoptionRequests#' + adoptionRequest.id;
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.acceptAdoptionRequest(adoptionRequest.id).subscribe();
  }

  rejectAdoptionRequest(adoptionRequest: any) {
    adoptionRequest.status = 'REJECTED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.user.email;
    notification.body = 'a accepté votre demande d\'adoption';
    notification.route = '/user_profile#adoptionRequests#' + adoptionRequest.id;
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.rejectAdoptionRequest(adoptionRequest.id).subscribe();
  }

}
