import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { environment } from 'src/environments/environment';
import { Notification } from './Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  options = {
    responseType: 'json' as const,
  };

  private notificationUrl = environment.backUrl + "/notification";

  constructor(private ws: WebSocketService, private http: HttpClient) {
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationUrl, this.options);
  }

  sendNotification(notification: Notification): Observable<Notification> {
    this.ws.push(notification, 'notifications' + notification.toUser);
    return this.http.post<Notification>(this.notificationUrl, notification, this.options);
  }

  readNotification(id): Observable<Notification> {
    if(!id){
      return;
    }
    return this.http.post<Notification>(this.notificationUrl + '/' + id + '/read', null, this.options);
  }

}
