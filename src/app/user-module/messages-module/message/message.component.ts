import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../User';
import { Message } from '../Message';
import { MessageService } from '../message.service';

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
  }

  getUser(email: string): User {
    return this.contacts?.filter(user => email == user.email)[0]
  }

  sendMessage() {
    let sendTo = this.messages[0].toUser == this.currentUser.email ? this.messages[0].fromUser : this.messages[0].toUser;
    let message: Message = new Message();
    message.body = this.toSend;
    message.fromUser = this.currentUser.email;
    message.toUser = sendTo;
    this.messages.unshift(message)
    this.messagesService.sendMessage(message).subscribe(next => message = next);
    this.toSend = '';
  }

  getHumanDate(time: Date): string {

    var secondBetweenTwoDate = Math.abs((new Date().getTime() - new Date(time).getTime()) / 1000);
    var minute = 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
    var fuzzy;
    if (secondBetweenTwoDate < 30) {
      fuzzy = 'maintenant.';
    } else if (secondBetweenTwoDate < minute) {
      fuzzy = secondBetweenTwoDate;
      fuzzy = 'il y\'a ' + fuzzy + 'secondes.'
    } else if (secondBetweenTwoDate < 2 * minute) {
      fuzzy = 'il y\'a une minute.'
    } else if (secondBetweenTwoDate < hour) {
      fuzzy = Math.floor(secondBetweenTwoDate / minute);
      fuzzy = 'il y\'a ' + fuzzy + 'minutes.'
    } else if (Math.floor(secondBetweenTwoDate / hour) == 1) {
      fuzzy = 'il y\'a une heure.'
    } else if (secondBetweenTwoDate < day) {
      fuzzy = Math.floor(secondBetweenTwoDate / hour);
      fuzzy = 'il y\'a ' + fuzzy + 'heures.'
    } else if (secondBetweenTwoDate < day * 2) {
      fuzzy = 'hier';
    }
    return fuzzy;
  }

}
