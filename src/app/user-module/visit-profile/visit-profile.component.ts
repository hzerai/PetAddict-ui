import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../messages-module/Message';
import { MessageService } from '../messages-module/message.service';
import { User } from '../User';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-visit-profile',
  templateUrl: './visit-profile.component.html',
  styleUrls: ['./visit-profile.component.css']
})
export class VisitProfileComponent implements OnInit {
  currentUser: User;
  user: User;
  messageBody: string = '';
  showMessageform: boolean = false;

  constructor(private messages: MessageService, private activatedRoute: ActivatedRoute, private userService: UserService, private tokenService: TokenStorageService, private route: Router) { }

  ngOnInit(): void {
    let id;
    this.activatedRoute.queryParamMap.subscribe(next => id = next.get('id'))
    if (id == this.tokenService.getUser()) {
      this.route.navigate(['/user_profile']);
    } else {
      this.userService.getUserById(id).subscribe(next => this.user = next)
    }
    this.getCurrentUser()
  }
  getCurrentUser() {
    const token = this.tokenService.getToken();
    if (token == null) {
      return;
    }
    let payload;
    payload = token.split(".")[1];
    payload = window.atob(payload);
    let username = JSON.parse(payload).username;
    this.userService.getUserById(username).subscribe(next => {
      this.currentUser = next;
    })
  }
  sendMessage() {
    let message: Message = new Message();
    message.body = this.messageBody;
    message.fromUser = this.currentUser.email;
    message.toUser = this.user.email;
    this.messages.sendMessage(message).subscribe(next => message = next);
    this.showMessageform = !this.showMessageform;
  }

}
