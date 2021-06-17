import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inbox } from '../messages-module/Inbox';
import { MessageService } from '../messages-module/message.service';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  child: string = 'profile';

  constructor(private messages: MessageService, private tokenStorageService: TokenStorageService, private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }
  user: User;
  inbox: Inbox = new Inbox();
  contacts: User[] = [];
  
  ngOnInit(): void {
    const token = this.tokenStorageService.getToken();
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      this.user = next;
    })
    this.messages.getAllMessages().subscribe(next => {
      Object.assign(this.inbox, next);
      this.createContactList(this.inbox);
    })
  }
  createContactList(inbox: Inbox) {
    Object.keys(inbox.messagesByUser).forEach((k) => {
      this.userService.getUserById(k).subscribe(next => this.contacts.push(next))
    })
  }
}
