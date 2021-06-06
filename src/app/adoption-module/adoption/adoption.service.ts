import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private adoptionUrl = "http://localhost:8000/api/adoptions";
  constructor(private http: HttpClient) { }


  getAdoptions(): Observable<Adoption[]> {
    return this.http.get<Adoption[]>(this.adoptionUrl);
  }

  getAdoptionById(id: string): Observable<Adoption> {
    return this.http.get<Adoption>(this.adoptionUrl + '/' + id);
  }
}
