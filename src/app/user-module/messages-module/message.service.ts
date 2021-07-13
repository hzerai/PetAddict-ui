import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inbox } from './Inbox';
import { Message } from './Message';
import { WebSocketService } from 'src/app/WebSockets/web-socket.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  options = {
    responseType: 'json' as const,
  };

  private inboxUrl = environment.backUrl + "/inbox";

  constructor(private http: HttpClient, private ws: WebSocketService) {
  }

  getAllMessages(): Observable<Inbox> {
    return this.http.get<Inbox>(this.inboxUrl, this.options);
  }
  getNewMessages(): Observable<any> {
    return this.http.put<any>(this.inboxUrl, null, this.options);
  }

  sendMessage(message: Message): Observable<Message> {
    this.ws.push(message, 'messages' + message.toUser);
    this.ws.push('new messages', 'messagesforheader' + message.toUser);
    
    return this.http.post<Message>(this.inboxUrl, message, this.options);
  }

  readMessage(id): Observable<any> {
    if (!id) {
      return;
    }
    return this.http.post<any>(this.inboxUrl + '/' + id + '/read', null, this.options);
  }

}
