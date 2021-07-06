import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { Inbox } from '../messages-module/Inbox';
import { Message } from '../messages-module/Message';
import { MessageService } from '../messages-module/message.service';
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
  private readonly notifier: NotifierService;

  child: string = 'profile';
  receivedAdoptionRequests: any[] = [];
  specialAdoptionRequest = -1;
  specialAdoptionRequestSender = -1;
  cameFromNotif = false;
  constructor(private ws: WebSocketService, private _eref: ElementRef, private route: ActivatedRoute, private messages: MessageService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }
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
    this.sortAdoptions();
    this.ws.watch('messages' + username).subscribe(next => {
      let message: Message = JSON.parse(next.body);
      if (!this.inbox.messagesByUser[message.fromUser]) {
        this.inbox.messagesByUser[message.fromUser] = [];
      }
      this.notifier.notify('default', this.getFromUser(message.fromUser) + ' : ' + message.body);
      this.inbox.messagesByUser[message.fromUser].unshift(message);
    });
  }

  sortAdoptions() {
    this.receivedAdoptionRequests?.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      return 1;
    })

    this.user?.adoptionRequests.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      }
      return 1;
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

  getFromUser(email: string): string {
    let userName = '';
    this.userService.getUserById(email).subscribe(u => userName = `${u.firstName} ${u.lastName}`)
    return userName;
  }



}
