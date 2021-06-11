import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable } from 'rxjs';
import { isDefined } from '@angular/compiler/src/util';
import { AdoptionRequest } from '../adoption-request/AdoptionRequest';


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  options = {
    responseType: 'json' as const,
  };
  private adoptionUrl = "http://localhost:8000/api/adoption";
  constructor(private http: HttpClient) { }


  getAdoptions(): Observable<Adoption[]> {
    return this.http.get<Adoption[]>(this.adoptionUrl);
  }

  getAdoptionById(id: string): Observable<Adoption> {
    return this.http.get<Adoption>(this.adoptionUrl + '/' + id);
  }

  newAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.post<Adoption>(this.adoptionUrl, adoption, this.options);
  }

  updateAdoption(adoption: Adoption): Observable<Adoption> {
    return this.http.put<Adoption>(this.adoptionUrl + '/' + adoption.id, adoption, this.options);
  }

  deleteAdoption(id: number): Observable<Adoption> {
    return this.http.delete<Adoption>(this.adoptionUrl + '/' + id, this.options);
  }
  getPagedAdoptions(page: number, size: number): Observable<Adoption[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(size));
    return this.http.get<Adoption[]>(this.adoptionUrl, { params });
  }

  getPagedAdoptionsFiltered(page: number, size: number, title: string, animal: string , user_id : string): Observable<Adoption[]> {
    let params = new HttpParams();
    params = page != null ? params.append('page', String(page)) : params;
    params = size != null ? params.append('size', String(size)) : params;
    params = title != null && title.length > 0 ? params.append('title', String(title)) : params;
    params = animal != null && animal.length > 0 ? params.append('animal', String(animal)) : params;
    params = user_id != null && user_id.length > 0 ? params.append('user_id', String(user_id)) : params;
    return this.http.get<Adoption[]>(this.adoptionUrl, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(this.adoptionUrl + 's/count');
  }

  createAdoptionRequest(id : number){
    return this.http.post<AdoptionRequest>(this.adoptionUrl + '/' + id + '/adopt', this.options);
  }

}
