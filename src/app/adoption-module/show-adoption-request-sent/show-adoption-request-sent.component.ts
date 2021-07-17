import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images-module/image.service';
import { Notification } from 'src/app/user-module/notification-module/Notification';
import { NotificationService } from 'src/app/user-module/notification-module/notification.service';
import { User } from 'src/app/user-module/User';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { AdoptionService } from '../adoption/adoption.service';
import { Temoignage } from '../temoignages/Temoignage';

@Component({
  selector: 'app-show-adoption-request-sent',
  templateUrl: './show-adoption-request-sent.component.html',
  styleUrls: ['./show-adoption-request-sent.component.css']
})
export class ShowAdoptionRequestSentComponent implements OnInit {

  @Input() adoptionsRequest: any;
  @Input() user: User;
  showTemoignage : boolean = false;
  temoignagebody: string = '';
  showInput : boolean = false;

  constructor(private ws: WebSocketService, private imageService: ImageService, private notifService: NotificationService, private adoptionService: AdoptionService) { }

  ngOnInit(): void {
    this.adoptionsRequest.show = false;
    this.showTemoignage = !this.adoptionsRequest.hasTestamony && this.adoptionsRequest.status == 'ACCEPTED';
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

  cancelAdoptionRequest(adoptionRequest: any) {
    adoptionRequest.status = 'CANCELED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.adoption.createdBy;
    notification.body = 'a annulé sa demande d\'adoption';
    notification.route = '/user_profile#RadoptionRequests#' + this.adoptionsRequest.adoption.id + '#' + this.user.id;
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.cancelAdoptionRequest(adoptionRequest.id).subscribe();
  }

  reopenAdoptionRequest(adoptionRequest: any) {
    adoptionRequest.status = 'CREATED';
    let notification = new Notification();
    notification.fromUser = this.user.email;
    notification.toUser = adoptionRequest.adoption.createdBy;
    notification.body = 'vous a envoyé une demande d\'adoption';
    notification.route = '/user_profile#RadoptionRequests#' + this.adoptionsRequest.adoption.id + '#' + this.user.id;
    console.log(notification)
    this.notifService.sendNotification(notification).subscribe();
    this.adoptionService.reopenAdoptionRequest(adoptionRequest.id).subscribe();
  }


  temoignage() {
    let temoignage = new Temoignage();
    temoignage.createdBy = this.user.email;
    temoignage.titre = "Témoignage de " + this.user.firstName;
    temoignage.body = this.temoignagebody;
    this.adoptionService.createTemoignage(this.adoptionsRequest.id, temoignage).subscribe();
    this.showInput = false;
    this.adoptionsRequest.hasTestamony = true;
  }
}
