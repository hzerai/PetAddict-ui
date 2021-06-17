import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inbox } from './Inbox';
import { Message } from './Message';



@Injectable({
  providedIn: 'root'
})
export class MessageService {

  options = {
    responseType: 'json' as const,
  };

  private inboxUrl = "http://localhost:8000/api/inbox";

  constructor(private http: HttpClient) {
  }

  getAllMessages(): Observable<Inbox> {
    return this.http.get<Inbox>(this.inboxUrl, this.options);
  }
  getNewMessages(): Observable<any> {
    return this.http.put<any>(this.inboxUrl, null, this.options);
  }
  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.inboxUrl, message, this.options);
  }

  readMessage(id): Observable<any> {
    return this.http.post<any>(this.inboxUrl + '/' + id + '/read', null, this.options);
  }

}
