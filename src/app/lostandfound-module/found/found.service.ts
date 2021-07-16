import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animals } from 'src/app/adoption-module/adoption/Animals';
import { Sexe } from 'src/app/adoption-module/adoption/Sexe';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { Found } from './found';
import { Comment } from 'src/app/post-module/comment/Comment';




@Injectable({
  providedIn: 'root'
})
export class FoundService {

  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };
  private foundUrl = "http://localhost:8000/api/found";

  constructor(private http: HttpClient) {
    FoundService.suggestions = this.populateSuggestions()
    
  }


  getFounds(): Observable<Found[]> {
    return this.http.get<Found[]>(this.foundUrl);
  }
  getUserFounds(): Observable<Found[]> {
    return this.http.get<Found[]>("http://localhost:8000/api/userfound");
  }


  getFoundById(idAsString: string): Observable<Found> {
    let id = Number(idAsString);
    return  this.http.get<Found>(this.foundUrl + '/' + id);
  }

  newFound(found: Found): Observable<Found> {
    return this.http.post<Found>(this.foundUrl, found, this.options);
  }

  updateFound(found: Found): Observable<Found> {
    return this.http.put<Found>(this.foundUrl + '/' + found.id, found, this.options);
  }

  deleteFound(id: number): Observable<Found> {
    
    return this.http.delete<Found>(this.foundUrl + '/' + id, this.options);
  }
  count(): Observable<number> {
    return this.http.get<number>(this.foundUrl + '/count');
  }

  getPagedFounds(page: number = 1, size: number = 6): Observable<Found[]> {
      let params = new HttpParams();
      params = params.append('page', String(page));
      params = params.append('size', String(size));
      return this.http.get<Found[]>(this.foundUrl, { params });
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
  addCommentfound(id:number,comment: Comment): Observable<Found> {
    return this.http.post<Found>(this.foundUrl+"/"+id+"/addcommentfound", comment, this.options);
  }

  replyfound(id:number,idcomment:number,comment: Comment): Observable<Found> {
    return this.http.post<Found>(this.foundUrl+"/"+id+"/addcommentfound/"+idcomment+"/replyfound", comment, this.options);
  }

}


  
  




