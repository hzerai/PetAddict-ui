import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../User';
import { Message } from '../Message';
import { MessageService } from '../message.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
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
    console.log('re')

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
    console.log()
    var secondBetweenTwoDate = Math.abs((new Date().getTime() - new Date(time).getTime()) / 1000);
    var minute = 60,
      hour = minute * 60,
      day = hour * 24,
      week = day * 7;
    var fuzzy;
    if (secondBetweenTwoDate < 60) {
      fuzzy = 'maintenant.';
    } else if (secondBetweenTwoDate < 2 * minute) {
      fuzzy = 'il y\'a une minute.'
    } else if (secondBetweenTwoDate < hour) {
      fuzzy = Math.floor(secondBetweenTwoDate / minute);
      fuzzy = 'il y\'a ' + + formatDate(time, 'mm', 'fr') + ' minutes.'
    } else if (Math.floor(secondBetweenTwoDate / hour) == 1) {
      fuzzy = 'il y\'a une heure.'
    } else if (secondBetweenTwoDate < day) {
      fuzzy = 'il y\'a ' + formatDate(time, 'h', 'fr') + ' heures.'
    } else if (secondBetweenTwoDate < day * 2) {
      fuzzy = 'hier ' +  formatDate(time, 'HH:mm', 'fr');
      console.log(fuzzy)
    } else if (secondBetweenTwoDate < week) {
      fuzzy = formatDate(time, 'EEEE HH:mm', 'fr');
    } else {
      fuzzy = formatDate(time, 'd MMMM y HH:mm', 'fr');
    }
    return fuzzy;
  }

  getFormatedDate(date: Date): string {
    var secondBetweenTwoDate = Math.abs((new Date().getTime() - new Date(date).getTime()) / 1000);
    if (secondBetweenTwoDate < 86400) {
      return formatDate(date, 'HH:mm', 'fr')
    } else {
      return formatDate(date, 'EEEE d MMMM y HH:mm', 'fr')
    }
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
