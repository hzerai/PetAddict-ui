import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { Comment } from 'src/app/post-module/comment/Comment';
import { Lost } from './Lost';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class LostService {

  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };
  private lostUrl = environment.backUrl + "/lost";
  constructor(private http: HttpClient) {
  LostService.suggestions = this.populateSuggestions()

    
  }


  getLosts(): Observable<Lost[]> {
    return this.http.get<Lost[]>(this.lostUrl);
  }
  getUserLosts(): Observable<Lost[]> {
    return this.http.get<Lost[]>(environment.backUrl +"/userlost");
  }

  getLostById(idAsString: string): Observable<Lost> {
    let id = Number(idAsString);
    return  this.http.get<Lost>(this.lostUrl + '/' + id);
  }

  newLost(lost: Lost): Observable<Lost> {
    return this.http.post<Lost>(this.lostUrl, lost, this.options);
  }

  updateLost(lost: Lost): Observable<Lost> {
    return this.http.put<Lost>(this.lostUrl + '/' + lost.id, lost, this.options);
  }

  deleteLost(id: number): Observable<Lost> {
    
    return this.http.delete<Lost>(this.lostUrl + '/' + id, this.options);
  }
  count(): Observable<number> {
    return this.http.get<number>(this.lostUrl + '/count');
  }

  getPagedLosts(page: number = 1, size: number = 6): Observable<Lost[]> {
      let params = new HttpParams();
      params = params.append('page', String(page));
      params = params.append('size', String(size));
      return this.http.get<Lost[]>(this.lostUrl, { params });
  }

  populateSuggestions(): string[] {

    let result: string[] = [];
    Object.values(Animals).forEach(v => result.push(v))
    Object.values(Sexe).forEach(v => result.push(v))
    Object.values(Tailles).forEach(v => result.push(v))
    Object.values(Colors).forEach(v => result.push(v))
    Object.values(DogBreed).forEach(v => result.push(v))
    Object.values(CatBreed).forEach(v => result.push(v))
    Object.values(HorseBreed).forEach(v => result.push(v))
    return result;
  }
  
  addCommentlost(id:number,comment: Comment): Observable<Lost> {
    return this.http.post<Lost>(this.lostUrl+"/"+id+"/addcommentlost", comment, this.options);
  }

  replylost(id:number,idcomment:number,comment: Comment): Observable<Lost> {
    return this.http.post<Lost>(this.lostUrl+"/"+id+"/addcommentlost/"+idcomment+"/replylost", comment, this.options);
  }
}


  
  




