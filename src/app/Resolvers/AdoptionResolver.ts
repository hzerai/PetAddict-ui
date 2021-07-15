import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AdoptionService } from "../adoption-module/adoption/adoption.service";
import { TokenStorageService } from "../user-module/_services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AdoptionResolver implements Resolve<any> {

    constructor(private adoptionService: AdoptionService, private tokenService: TokenStorageService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if(this.router.url!="/admin/adoptions"){
            return this.getAllData();
        }*/
        let id = route.params['id'];
        return this.getData(id);

    }
    getAllData(): Promise<any> {
        return new Promise((resolve, reject) => this.adoptionService.getPagedAdoptions(null, null, null).subscribe(a => {
            return resolve({
                adoption: a,
                canAdopt: true
            });
        }))
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
        return new Promise((resolve, reject) =>
            this.adoptionService.getAdoptionById(id, 'user').subscribe(a => {
                let canAdopt: boolean = true;
                let owner: boolean = false;
                if (a.createdBy === username) {
                    canAdopt = false;
                    owner = true;
                } else {
                    if (a.adoptionRequests && a.adoptionRequests.find(r => r.createdBy === username)) {
                        canAdopt = false;
                    }
                }
                return resolve({
                    adoption: a,
                    username: username,
                    canAdopt: canAdopt,
                    owner: owner
                });
            })
        )
    }
}