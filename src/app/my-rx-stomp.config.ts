import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import { environment } from 'src/environments/environment';

export const myRxStompConfig: InjectableRxStompConfig = {
  brokerURL: environment.rabbitMq,
  connectHeaders: {
    login: environment.rabbitMqUser,
    passcode: environment.rabbitMqPassword,
  },
  heartbeatIncoming: 0, 
  heartbeatOutgoing: 20000, 
  reconnectDelay: 200,
  // logRawCommunication : true,
  // debug: (msg: string): void => {
  //   console.log(new Date(), msg);
  // },
};