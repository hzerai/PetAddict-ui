import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private rxStompService: RxStompService) { }

  public watch(topic: string): Observable<Message> {
    return this.rxStompService.watch('/topic/' + topic.replace(/[^a-zA-Z0-9 ]/g, ""));
  }

  public push(obj: any, topic: string) {
    this.rxStompService.publish({ destination: '/topic/' + topic.replace(/[^a-zA-Z0-9 ]/g, ""), body: JSON.stringify(obj) });
  }
}
