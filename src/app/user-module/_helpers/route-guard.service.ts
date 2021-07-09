import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private token: TokenStorageService,private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot){
    const token = this.token.getToken();
    if(token!=null){
      let payload;
      payload = token.split(".")[1];
      payload = window.atob(payload);
      let Roles =JSON.parse(payload).roles;
      if(Roles.indexOf('ROLE_ADMIN') > -1){
        return true;
      }
    }
    this.router.navigateByUrl('/');
    return false;
  }
}