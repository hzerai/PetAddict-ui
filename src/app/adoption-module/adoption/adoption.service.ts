import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable } from 'rxjs';
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
    console.log('loaded serivce')

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

  
  getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality , user_id , page , size) {
    let params = new HttpParams();
    params = espece != null && espece.length > 0 ? params.append('espece', String(espece)) : params;
    params = type != null && type.length > 0 ? params.append('type', String(type)) : params;
    params = sexe != null && sexe.length > 0 ? params.append('sexe', String(sexe)) : params;
    params = taille != null && taille.length > 0 ? params.append('taille', String(taille)) : params;
    params = ville != null && ville.length > 0 ? params.append('ville', String(ville)) : params;
    params = user_id != null && user_id.length > 0 ? params.append('user_id', String(user_id)) : params;
    params = page != null ? params.append('page', String(page)) : params;
    params = size != null ? params.append('size', String(size)) : params;
    params = municipality != null && municipality.length > 0 ? params.append('municipality', String(municipality)) : params;
    return this.http.get<Adoption[]>(this.adoptionUrl, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(this.adoptionUrl + 's/count');
  }

  createAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionUrl + '/' + id + '/adopt', this.options);
  }

}
