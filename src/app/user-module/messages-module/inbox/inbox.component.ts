import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../User';
import { Inbox } from '../Inbox';
import { Message } from '../Message';
import { MessageService } from '../message.service';
import { PetAddictDate } from '../PetAddictDates';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private msgService: MessageService) { }

  @Input() contacts: User[] = [];
  @Input() currentUser: User;
  @Input() inbox: Inbox = new Inbox();

  selectedContact: string;

  ngOnInit(): void {
    
  }


  read(email: string) {
    this.selectedContact = email
    let msg: Message[] = this.inbox.messagesByUser[email];
    msg.forEach(m => {
      if (!m.vu) {
        m.vu = true;
        this.msgService.readMessage(m.id).subscribe(next => { });
      }
    })
  }

  getHumanDate(time: Date): string {
    return PetAddictDate.getHumanDate(time);
  }
}
