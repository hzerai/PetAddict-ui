import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../User';
import { Inbox } from '../Inbox';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor() { }

  @Input() contacts: User[] = [];
  @Input() currentUser: User;
  @Input() inbox: Inbox = new Inbox();

  selectedContact: string;

  ngOnInit(): void {
    this.selectedContact = Object.keys(this.inbox.messagesByUser)[0]
  }

}
