import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../User';
import { Message } from '../Message';
import { MessageService } from '../message.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { PetAddictDate } from '../PetAddictDates';
registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private messagesService: MessageService) { }
  @Input() messages: Message[];
  @Input() contacts: User[];
  @Input() currentUser: User;
  toSend: string = '';

  ngOnInit(): void {
    this.messages.forEach(message => {
      message.vu = true;
    })
  }

  getUser(email: string): User {
    return this.contacts?.filter(user => email == user.email)[0]
  }

  sendMessage() {
    if (this.toSend.length == 0) {
      return;
    }
    let sendTo = this.messages[0].toUser == this.currentUser.email ? this.messages[0].fromUser : this.messages[0].toUser;
    let message: Message = new Message();
    message.body = this.toSend;
    message.fromUser = this.currentUser.email;
    message.toUser = sendTo;
    message.createdAt = new Date();
    this.messages.unshift(message)
    this.messagesService.sendMessage(message).subscribe(next => message = next);
    this.toSend = '';
  }

  getHumanDate(time: Date): string {
    return PetAddictDate.getHumanDate(time);
  }

  getFormatedDate(date: Date): string {
    return PetAddictDate.getFormatedDate(date);
  }

  showMessageDate(message: Message, messages: Message[]) {
    if (messages[0].id == message.id) { return true }
    let prev = messages[messages.indexOf(message) + 1];
    if (prev == null) {
      return true;
    }
    return Math.abs((new Date(prev.createdAt).getTime() - new Date(message.createdAt).getTime()) / 1000) > 2000
  }

}
