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
import { Lost } from './lost';



@Injectable({
  providedIn: 'root'
})
export class LostService {

  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };
  private lostUrl = "http://localhost:8000/api/lost";
  constructor(private http: HttpClient) {
  LostService.suggestions = this.populateSuggestions()

    
  }


  getLosts(): Observable<Lost[]> {
    return this.http.get<Lost[]>(this.lostUrl);
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
}


  
  




