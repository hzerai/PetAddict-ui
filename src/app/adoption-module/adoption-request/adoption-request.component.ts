import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/user-module/messages-module/Message';
import { MessageService } from 'src/app/user-module/messages-module/message.service';
import { Notification } from 'src/app/user-module/notification-module/Notification';
import { NotificationService } from 'src/app/user-module/notification-module/notification.service';
import { User } from 'src/app/user-module/User';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.css']
})
export class AdoptionRequestComponent implements OnInit {
  adoption: Adoption = new Adoption();
  currentUser: User;
  messageBody: string = '';
  constructor(private location: Location, private notifService: NotificationService, private messages: MessageService, private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.adoptionService.getAdoptionById(id).subscribe(next => { this.adoption = next });
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

  envoyerDemande() {
    if (this.currentUser == null) {
      return;
    }
    let message: Message = new Message();
    message.body = this.messageBody;
    message.fromUser = this.currentUser.email;
    message.toUser = this.adoption.user.email;
    this.messages.sendMessage(message).subscribe(next => message = next);

    let notification = new Notification();
    notification.fromUser = this.currentUser.email;
    notification.toUser = this.adoption.user.email;
    notification.body = 'Vous avez une nouvelle demande d\'adoption';
    this.notifService.sendNotification(notification).subscribe(next => { })

    this.adoptionService.createAdoptionRequest(this.adoption.id, this.currentUser.email).subscribe(next => {
      UserService.cache.get(this.currentUser.email).adoptionRequests.push(next)
      AdoptionService.cache.get(this.adoption.id).adoptionRequests.push(next)
      UserService.cache.get(this.adoption.user.email).adoptions.find(a => a.id = this.adoption.id).adoptionRequests.push(next)
      console.log(UserService.cache.get(this.adoption.user.email))
    });
    this.location.back();
  }
}
