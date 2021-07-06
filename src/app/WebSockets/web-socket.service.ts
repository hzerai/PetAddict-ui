import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable } from 'rxjs';
import { Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  subscriptions: [] = []

  constructor(private rxStompService: RxStompService) { }

  public watch(topic: string): Observable<Message> {
    return this.rxStompService.watch('/topic/' + topic.replace(/[^a-zA-Z0-9 ]/g, ""));
  }

  public subscribe(topic: string, next?: (value: Message) => void) {
    if (this.subscriptions[topic]) {
      try {
        this.subscriptions[topic].unsubscribe()
      } catch (e) {
        try {
          this.subscriptions[topic].forEach((sub) => sub.unsubscribe());
        } catch (e) {
          console.log('coudnt handle multiple subs on topic :(')
        }
      }
    }
    this.subscriptions[topic] = this.rxStompService.watch('/topic/' + topic.replace(/[^a-zA-Z0-9 ]/g, "")).subscribe(next);
  }

  public push(obj: any, topic: string) {
    this.rxStompService.publish({ destination: '/topic/' + topic.replace(/[^a-zA-Z0-9 ]/g, ""), body: JSON.stringify(obj) });
  }
}
