import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Association } from "./Association";
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class AssociationService {
  
    private associationUrl = environment.backUrl + "/association";
    
    constructor(private http: HttpClient){
      
    }

    getAssociations(): Observable<Association[]> {
        return this.http.get<Association[]>(this.associationUrl);
      }
    
     
  }
 