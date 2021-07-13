import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Veto } from "./Veto";
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class VetoService {
  
    private vetoUrl = environment.backUrl + "/veto";
    
    constructor(private http: HttpClient){
      
    }

    getVeto(): Observable<Veto[]> {
        return this.http.get<Veto[]>(this.vetoUrl);
      }
    
     
  }
 