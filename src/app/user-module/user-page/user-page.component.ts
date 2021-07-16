import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Image } from 'src/app/images-module/Image';
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
export class UserPageComponent implements OnInit, AfterViewInit {

  private readonly notifier: NotifierService;
  child: string = 'profile';
  receivedAdoptionRequests: any[] = [];
  specialAdoptionRequest = -1;
  specialAdoptionRequestSender = -1;
  cameFromNotif = false;
  username: string;
  user: User;
  inbox: Inbox = new Inbox();
  contacts: User[] = [];
  unreadMessages: number = 0;
  image : Image;

  constructor(private ws: WebSocketService, private _eref: ElementRef, private route: ActivatedRoute, private messages: MessageService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngAfterViewInit(): void {
    this.ws.subscribe('messages' + this.username, next => {
      let message: Message = JSON.parse(next.body);
      if (!this.inbox.messagesByUser[message.fromUser]) {
        this.inbox.messagesByUser[message.fromUser] = [];
      }
      this.notifier.notify('default', this.getFromUser(message.fromUser) + ' : ' + message.body);
      this.inbox.messagesByUser[message.fromUser].unshift(message);
    });
  }


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
        if (id != null) {
          this.cameFromNotif = true;
          this.specialAdoptionRequest = Number(id);
          this.specialAdoptionRequestSender = Number(u);
        }
      }
    });

    this.activatedRoute.data.subscribe((data) => {
      this.user = data.data.currentUser;
      this.username = this.user.email;
      this.contacts = data.data.contacts;
      this.inbox = data.data.inbox;
      this.unreadMessages = data.data.unreadMessages;
      this.receivedAdoptionRequests = data.data.receivedAdoptionRequests;   
      this.image = data.data.image;  
    });


    this.sortAdoptions();
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



  onClick(event) {
    if (this._eref.nativeElement.contains(event.target))
      this.specialAdoptionRequest = -1;
    if (this.child === 'inbox')
      this.unreadMessages = 0;
  }

  getFromUser(email: string): string {
    let u = this.contacts?.find(usr => usr.email === email);
    return `${u.firstName} ${u.lastName}`;
  }
}
