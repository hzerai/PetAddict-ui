import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AdoptionService } from "../adoption-module/adoption/adoption.service";
import { TokenStorageService } from "../user-module/_services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AdoptionResolver implements Resolve<any> {

    constructor(private adoptionService: AdoptionService, private tokenService: TokenStorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let id = route.params['id'];
        return this.getData(id);

    }

    getData(id): Promise<any> {
        if (id == null) {
            return null;
        }
        const token = this.tokenService.getToken();
        if (token == null) {
            return new Promise((resolve, reject) => this.adoptionService.getAdoptionById(id, 'user').subscribe(a => {
                return resolve({
                    adoption: a,
                    canAdopt: true
                });
            }))
        }
        let payload;
        payload = token.split(".")[1];
        payload = window.atob(payload);
        let username = JSON.parse(payload).username;
        let canAdopt: boolean;
        return new Promise((resolve, reject) => this.adoptionService.canAdopt(Number(id), username).subscribe(b => {
            canAdopt = b;
            this.adoptionService.getAdoptionById(id, 'user').subscribe(a => {
                return resolve({
                    adoption: a,
                    username: username,
                    canAdopt: canAdopt
                });
            });
        }))



    }
}