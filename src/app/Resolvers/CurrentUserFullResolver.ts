import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Inbox } from "../user-module/messages-module/Inbox";
import { MessageService } from "../user-module/messages-module/message.service";
import { TokenStorageService } from "../user-module/_services/token-storage.service";
import { UserService } from "../user-module/_services/user.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserFullResolver implements Resolve<any> {

    constructor(private userService: UserService, private tokenService: TokenStorageService, private messages: MessageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenService.getToken();
        if (token == null) {
            return;
        }
        let payload;
        payload = token.split(".")[1];
        payload = window.atob(payload);
        let username = JSON.parse(payload).username;
        return this.getData(username);

    }

    getData(id): Promise<any> {
        return new Promise((resolve, reject) => this.userService.getUserById(id, 'adoptions,requests').subscribe(u => {
            let receivedAdoptionRequests = [];
            let currentUser = u;
            currentUser.recievedAdoptionRequests.forEach(r => {
                let m: any = r; m.show = false; receivedAdoptionRequests.push(m)
            })
            let contacts = [];
            let unreadMessages = 0;
            let inbox = new Inbox();
            this.messages.getAllMessages().subscribe(next => {
                // Object.assign(inbox, next);
                inbox = next;
                Object.keys(inbox.messagesByUser).forEach((k) => {
                    inbox.messagesByUser[k].forEach(m => {
                        if (!m.vu && m.toUser == id) {
                            unreadMessages++;
                        }
                    })
                    this.userService.getUserById(k, null).subscribe(next => contacts.push(next))
                })
                return resolve({
                    currentUser: currentUser,
                    contacts: contacts,
                    inbox: inbox,
                    unreadMessages: unreadMessages,
                    receivedAdoptionRequests: receivedAdoptionRequests
                })
            })
        }))


    }


}