import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TokenStorageService } from "../user-module/_services/token-storage.service";
import { UserService } from "../user-module/_services/user.service";
import { CurrentUserFullResolver } from "./CurrentUserFullResolver";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {

    constructor(private userService: UserService, private tokenService: TokenStorageService, private cur: CurrentUserFullResolver) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.queryParamMap.get('id');
        return this.getData(id);

    }

    getData(id): Promise<any> {
        const token = this.tokenService.getToken();
        if (token == null) {
            return new Promise((resolve, reject) => this.userService.getUserByEmail(id, null).subscribe(u => {
                return resolve({
                    user: u,
                });
            }))
        }
        let payload;
        payload = token.split(".")[1];
        payload = window.atob(payload);
        let username = JSON.parse(payload).username;
        if (id === username) {
            return this.cur.getData(id);
        }
        return new Promise((resolve, reject) => this.userService.getUserByEmail(id, null).subscribe(u => {
            this.userService.getUserByEmail(username, null).subscribe(next => {
                return resolve({
                    user: u,
                    currentUser: next
                });
            })

        }))
    }
}