import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { FoundService } from "../lostandfound-module/found/found.service"; 
import { TokenStorageService } from "../user-module/_services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class FoundResolver implements Resolve<any> {

    constructor(private foundService: FoundService, private tokenService: TokenStorageService,private router:Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        /*if(this.router.url!="/admin/founds"){
            return this.getAllData();
        }*/
        let id = route.params['id'];
        return this.getData(id);

    }
    getAllData():Promise<any> {
        return new Promise((resolve, reject) => this.foundService.getPagedFounds(null,null).subscribe(a => {
            return resolve({
                found: a,
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
            return new Promise((resolve, reject) => this.foundService.getFoundById(id).subscribe(a => {
                return resolve({
                    found: a,
                    canAdopt: true
                });
            }))
        }
        



    }
}