import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { Notification } from './Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  options = {
    responseType: 'json' as const,
  };

  private notificationUrl = "http://localhost:8000/api/notification";

  constructor(private ws: WebSocketService, private http: HttpClient) {
  }

  getAllNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationUrl, this.options);
  }

  notificationsStream(id): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.notificationUrl + '/' + id + '/new');
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
