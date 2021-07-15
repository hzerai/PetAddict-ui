import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { LostService } from "../lostandfound-module/lost/lost.service";
import { TokenStorageService } from "../user-module/_services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class LostResolver implements Resolve<any> {

    constructor(private lostService: LostService, private tokenService: TokenStorageService,private router:Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if(this.router.url!="/admin/losts"){
            return this.getAllData();
        }*/
        let id = route.params['id'];
        return this.getData(id);

    }
    getAllData():Promise<any> {
        return new Promise((resolve, reject) => this.lostService.getPagedLosts(null,null).subscribe(a => {
            return resolve({
                lost: a,
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
            return new Promise((resolve, reject) => this.lostService.getLostById(id).subscribe(a => {
                return resolve({
                    lost: a,
                    canAdopt: true
                });
            }))
        }
        



    }
}