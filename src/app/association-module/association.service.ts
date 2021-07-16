import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Association } from "./Association";
import { Observable } from 'rxjs';
import { title } from "process";
@Injectable({
    providedIn: 'root'
  })
  export class AssociationService {
    public static suggestions: string[];
    private associationUrl = environment.backUrl + "/association";
    options = {
      responseType: 'json' as const,
    };
    
    constructor(private http: HttpClient){
      
    }

    getAssociations(): Observable<Association[]> {
        return this.http.get<Association[]>(this.associationUrl);
      }

      getAssociationById(idAsString: string): Observable<Association> {
        let id = Number(idAsString);
        return  this.http.get<Association>(this.associationUrl + '/' + id);
      }
      getPagedAssociations(page: number = 1, size: number = 6): Observable<Association[]> {
        let params = new HttpParams();
        params = params.append('page', String(page));
        params = params.append('size', String(size));
        return this.http.get<Association[]>(this.associationUrl, { params });
    }
    newAssociation(association: Association): Observable<Association> {
      return this.http.post<Association>(this.associationUrl, association, this.options);
    }
    
  
    updateAssociation(association: Association): Observable<Association> {
      return this.http.put<Association>(this.associationUrl + '/' + association.id, association, this.options);
    }
  
    deleteAssociation(id: number): Observable<Association> {
      
      return this.http.delete<Association>(this.associationUrl + '/' + id, this.options);
    }
    count(): Observable<number> {
      return this.http.get<number>(this.associationUrl + '/count');
    }
    elasticSearch(keyword: string): Observable<Association[]> {
      if (keyword == null || keyword.length < 4) {
        return;
      }
      let params = new HttpParams();
      if (keyword != null && keyword.length > 0) {
        params = params.append('keyword', keyword);
      }
      return this.http.get<Association[]>(this.associationUrl + 's/elasticsearch' , {params});
    }
    populateSuggestions(): string[] {

      let result: string[] = [];
      Object.values(Association).forEach(v => result.push(v))
     
      return result;
    }
     
  }
 