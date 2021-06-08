import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable } from 'rxjs';


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

}
