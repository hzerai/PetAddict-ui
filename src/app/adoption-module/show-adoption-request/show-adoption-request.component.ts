import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images-module/image.service';
import { Notification } from 'src/app/user-module/notification-module/Notification';
import { NotificationService } from 'src/app/user-module/notification-module/notification.service';
import { User } from 'src/app/user-module/User';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { AdoptionRequest } from '../adoption-request/AdoptionRequest';
import { AdoptionService } from '../adoption/adoption.service';

@Component({
  selector: 'app-show-adoption-request',
  templateUrl: './show-adoption-request.component.html',
  styleUrls: ['./show-adoption-request.component.css']
})
export class ShowAdoptionRequestComponent implements OnInit {

  @Input() adoptionsRequest: any;
  @Input() user: User;
  constructor(private ws: WebSocketService, private imageService: ImageService, private notifService: NotificationService, private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionsRequest.show = false;
  }
  getUserImage(adoptionRequest: any) {
    let image;
    this.imageService.getImage('ADOPTION-' + adoptionRequest.adoption.id).subscribe(next => image = next);
    if (image == null) {
      return 'https://placedog.net/500/280?id=' + (this.adoptionsRequest.adoption?.id > 200 ? this.adoptionsRequest.adoption?.id - 100 : this.adoptionsRequest.adoption?.id);
    } else {
      return image.bytes;
    }
  }
  getAdoptionRequestStatusColor(adoptionRequest: any): string {
    if (adoptionRequest.status == 'CREATED') {
      return 'yellow'
    } else if (adoptionRequest.status == 'REJECTED') {
      return 'red'
    } else if (adoptionRequest.status == 'CANCELED') {
      return 'gray';
    } else {
      return 'green'
    }
  }
  acceptAdoptionRequest(adoptionRequest: AdoptionRequest) {
    adoptionRequest.status = 'ACCEPTED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.user.email;
    notification.body = 'a accepté votre demande d\'adoption';
    notification.route = '/user_profile#adoptionRequests#' + adoptionRequest.id;
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.acceptAdoptionRequest(adoptionRequest.id).subscribe(next => {
      this.ws.push(next, 'adoptionRequest');
    });
  }

  rejectAdoptionRequest(adoptionRequest: any) {
    adoptionRequest.status = 'REJECTED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.user.email;
    notification.body = 'a rejeté votre demande d\'adoption';
    notification.route = '/user_profile#adoptionRequests#' + adoptionRequest.id;
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.rejectAdoptionRequest(adoptionRequest.id).subscribe(next => {
      this.ws.push(next, 'adoptionRequest');
    });
  }
}
