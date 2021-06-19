import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptionRequest } from 'src/app/adoption-module/adoption-request/AdoptionRequest';
import { Inbox } from '../messages-module/Inbox';
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

  child: string = 'profile';
  receivedAdoptionRequests: AdoptionRequest[] = [];
  specialAdoptionRequest = -1;
  specialAdoptionRequestSender = -1;
  cameFromNotif = false;
  constructor(private _eref: ElementRef, private route: ActivatedRoute, private messages: MessageService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  user: User;
  inbox: Inbox = new Inbox();
  contacts: User[] = [];
  unreadMessages: number = 0;
  ngOnInit(): void {
    let id;
    let u;
    let section;
    this.route.queryParamMap.subscribe(next => {
      id = next.get('id'); section = next.get('section'); u = next.get('u');
      if (section != null) {
        this.child = section;
        this.cameFromNotif = true;
        if (id != null) {
          this.specialAdoptionRequest = Number(id);
          this.specialAdoptionRequestSender = Number(u);
        }
      }
      console.log(next.get('section'))
    });

    const token = this.tokenStorageService.getToken();
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      next.adoptions.forEach(a => a.adoptionRequests.forEach(r => { r.adoption = a; this.receivedAdoptionRequests.push(r) }))
      this.user = next;
      console.log(this.receivedAdoptionRequests)
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

}
