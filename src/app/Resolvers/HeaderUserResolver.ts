import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TokenStorageService } from "../user-module/_services/token-storage.service";
import { UserService } from "../user-module/_services/user.service";
import { CurrentUserFullResolver } from "./CurrentUserFullResolver";

@Injectable({
    providedIn: 'root'
})
export class HeaderUserResolver implements Resolve<any> {

    constructor(private userService: UserService, private tokenService: TokenStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    }

    getCurrentUser(): Promise<any> {
        const token = this.tokenService.getToken();
        if (token == null) {
            return null;
        }
        let payload;
        payload = token.split(".")[1];
        payload = window.atob(payload);
        let username = JSON.parse(payload).username;
        return new Promise((resolve, reject) => this.userService.getUserByEmail(username, null).subscribe(u => {
            resolve(u)
        }))
    }
}
