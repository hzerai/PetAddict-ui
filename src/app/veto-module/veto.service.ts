import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Veto } from "./Veto";
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class VetoService {
    public static suggestions: string[];
    private vetoUrl = environment.backUrl + "/veto";
    options = {
      responseType: 'json' as const,
    };
    
    constructor(private http: HttpClient){
      
    }

    getVeto(): Observable<Veto[]> {
        return this.http.get<Veto[]>(this.vetoUrl);
      }

      getVetoById(idAsString: string): Observable<Veto> {
        let id = Number(idAsString);
        return  this.http.get<Veto>(this.vetoUrl + '/' + id);
      }
      getPagedVetos(page: number = 1, size: number = 6): Observable<Veto[]> {
        let params = new HttpParams();
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        return this.http.get<Veto[]>(this.vetoUrl, { params });
    }
    newVeto(veto: Veto): Observable<Veto> {
      return this.http.post<Veto>(this.vetoUrl, veto, this.options);
    }
  
    updateVeto(veto: Veto): Observable<Veto> {
      return this.http.put<Veto>(this.vetoUrl + '/' + veto.id, veto, this.options);
    }
  
    deleteVeto(id: number): Observable<Veto> {
      
      return this.http.delete<Veto>(this.vetoUrl + '/' + id, this.options);
    }
    count(): Observable<number> {
      return this.http.get<number>(this.vetoUrl + '/count');
    }


    elasticSearch(keyword: string): Observable<Veto[]> {
      if (keyword == null || keyword.length < 4) {
        return;
      }
      let params = new HttpParams();
      if (keyword != null && keyword.length > 0) {
        params = params.append('keyword', keyword);
      }
      return this.http.get<Veto[]>(this.vetoUrl + 's/elasticsearch' , {params});
    }
    populateSuggestions(): string[] {

      let result: string[] = [];
      Object.values(Veto).forEach(v => result.push(v))
     
      return result;
    }
    
     
  }
 