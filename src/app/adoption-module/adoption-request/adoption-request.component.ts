import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { Message } from 'src/app/user-module/messages-module/Message';
import { MessageService } from 'src/app/user-module/messages-module/message.service';
import { Notification } from 'src/app/user-module/notification-module/Notification';
import { NotificationService } from 'src/app/user-module/notification-module/notification.service';
import { TokenStorageService } from 'src/app/user-module/_services/token-storage.service';
import { UserService } from 'src/app/user-module/_services/user.service';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { Adoption } from '../adoption/Adoption';
import { AdoptionService } from '../adoption/adoption.service';
@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.css']
})
export class AdoptionRequestComponent implements OnInit {

  adoption: Adoption = new Adoption();
  username: string;
  messageBody: string = '';
  image: Image;

  constructor(private ws: WebSocketService, private imageService: ImageService, private location: Location, private notifService: NotificationService, private messages: MessageService, private route: ActivatedRoute, private adoptionService: AdoptionService, private r: Router, private userService: UserService, private tokenService: TokenStorageService, private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.username = data.data.username;
      this.adoption = data.data.adoption;
      this.imageService.getImage(`ADOPTION-${data.data.adoption.id}`).subscribe(next => { this.image = next });
    });
  }
  
  envoyerDemande() {
    if (this.username == null) {
      return;
    }
    this.notifierService.notify('default', 'Sending adoption request. please wait ...', 'send');
    this.adoptionService.createAdoptionRequest(this.adoption.id, this.username).subscribe(next => {
      let notification = new Notification();
      notification.fromUser = this.username;
      notification.toUser = this.adoption.createdBy;
      notification.body = 'vous a envoyé une demande d\'adoption';
      notification.route = '/user_profile#RadoptionRequests#' + this.adoption.id + '#' + next.userId;
      this.notifService.sendNotification(notification).subscribe()
      let message: Message = new Message();
      message.body = this.messageBody;
      message.createdAt = new Date();
      message.fromUser = this.username;
      message.toUser = this.adoption.createdBy;
      this.messages.sendMessage(message).subscribe(next => message = next);
      this.notifierService.hide('send');
      this.notifierService.notify('success', 'Votre demande a été envoyée avec succès.');
      this.r.navigate(['/adoptions'])
    })
  }

}
