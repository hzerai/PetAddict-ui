import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable, of } from 'rxjs';
import { AdoptionRequest } from '../adoption-request/AdoptionRequest';
import { Animals } from './Animals';
import { Sexe } from './Sexe';
import { DogBreed } from 'src/app/interface-module/filter/DogBreed';
import { CatBreed } from 'src/app/interface-module/filter/CatBreed';
import { HorseBreed } from 'src/app/interface-module/filter/HorseBreed';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { environment } from 'src/environments/environment';
import { Temoignage } from '../temoignages/Temoignage';


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };

  private adoptionUrl = environment.backUrl + "/adoption";
  private adoptionRequestUrl = environment.backUrl + "/adoptionRequest/";

  constructor(private http: HttpClient) {
    AdoptionService.suggestions = this.populateSuggestions()
  }


  elasticSearch(keyword: string): Observable<Adoption[]> {
    if (keyword == null || keyword.length < 4) {
      return;
    }
    let params = new HttpParams();
    if (keyword != null && keyword.length > 0) {
      params = params.append('keyword', keyword);
    }
    return this.http.get<Adoption[]>(this.adoptionUrl + 's/elasticsearch', { params });
  }


  getAdoptionById(idAsString: string, key: string): Observable<Adoption> {
    let id = Number(idAsString);
    let params = new HttpParams();
    if (key != null && key.length > 0) {
      params = params.append('key', key);
    }
    return this.http.get<Adoption>(this.adoptionUrl + '/' + id, { params });
  }

  coupDeCoeur(): Observable<Adoption> {
    return this.http.get<Adoption>(this.adoptionUrl + 'coupdecoeur/');
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

  getPagedAdoptions(page: number = 1, size: number = 6, key: string): Observable<Adoption[]> {

    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(size));
    if (key != null && key.length > 0) {
      params = params.append('key', key);
    }
    return this.http.get<Adoption[]>(this.adoptionUrl, { params });
  }

  getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id, page, size, age, couleur, urgent: boolean, status, key: string) {
    let params = new HttpParams();
    if (key != null && key.length > 0) {
      params = params.append('key', key);
    }
    if (espece != null && espece.length > 0) {
      params = params.append('espece', String(espece));
    }
    if (type != null && type.length > 0) {
      params = params.append('type', String(type))
    }
    if (urgent) {
      params = params.append('urgent', String(urgent));
    }
    if (status != null && status.length > 0) {
      params = params.append('status', String(status))
    }
    if (sexe != null && sexe.length > 0) {
      params = params.append('sexe', String(sexe));
    }
    if (taille != null && taille.length > 0) {
      params = params.append('taille', String(taille));
    }
    if (ville != null && ville.length > 0) {
      params = params.append('ville', String(ville));
    }
    if (age != null && age.length > 0) {
      params = params.append('age', String(age));
    }
    if (couleur != null && couleur.length > 0) {
      params = params.append('couleur', String(couleur));
    }
    if (municipality != null && municipality.length > 0) {
      params = params.append('municipality', String(municipality));
    }
    if (user_id != null && user_id.length > 0) {
      params = params.append('user_id', String(user_id));
    }
    if (page != null) {
      params = params.append('page', String(page))
    }
    if (size != null) {
      params = params.append('size', String(size))
    }
    return this.http.get<Adoption[]>(this.adoptionUrl, { params });

  }

  count(): Observable<number> {
    return this.http.get<number>(this.adoptionUrl + 's/count');
  }

  countFiltered(espece, type, sexe, taille, ville, municipality, age, couleur, user_id, urgent: boolean, status): Observable<number> {
    let params = new HttpParams();
    if (espece != null && espece.length > 0) {
      params = params.append('espece', String(espece));
    }
    if (type != null && type.length > 0) {
      params.append('type', String(type))
    }
    if (urgent) {
      params = params.append('urgent', String(urgent));
    }
    if (status != null && status.length > 0) {
      params = params.append('status', String(status))
    }
    if (sexe != null && sexe.length > 0) {
      params = params.append('sexe', String(sexe));
    }
    if (taille != null && taille.length > 0) {
      params = params.append('taille', String(taille));
    }
    if (age != null && age.length > 0) {
      params = params.append('age', String(age));
    }
    if (couleur != null && couleur.length > 0) {
      params = params.append('couleur', String(couleur));
    }
    if (ville != null && ville.length > 0) {
      params = params.append('ville', String(ville));
    }
    if (municipality != null && municipality.length > 0) {
      params = params.append('municipality', String(municipality));
    }
    if (user_id != null && user_id.length > 0) {
      params = params.append('user_id', String(user_id));
    }
    return this.http.get<number>(this.adoptionUrl + 's/count', { params });
  }

  createAdoptionRequest(id: number, userId: string) {
    return this.http.post<AdoptionRequest>(this.adoptionUrl + '/' + id + '/adopt', this.options);
  }

  createTemoignage(id: number, temoignage: Temoignage): Observable<Temoignage> {
    return this.http.post<Temoignage>(this.adoptionRequestUrl + id + '/temoignage', temoignage, this.options);
  }

  getAllTemoignage(): Observable<Temoignage[]> {
    return this.http.get<Temoignage[]>(this.adoptionRequestUrl + 'temoignages', this.options);
  }

  acceptAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionRequestUrl + id + '/accept', this.options);
  }

  rejectAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionRequestUrl + id + '/reject', this.options);
  }
  cancelAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionRequestUrl + id + '/cancel', this.options);
  }
  reopenAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionRequestUrl + id + '/reopen', this.options);
  }

  getAdoptionRequest(id: number) {
    return this.http.get<AdoptionRequest>(this.adoptionRequestUrl + id);
  }

  getUsersAdoptionRequests(email: string): Observable<AdoptionRequest[]> {
    return this.http.get<AdoptionRequest[]>(this.adoptionRequestUrl + 'user/' + email);
  }

  getAdoptionAdoptionRequests(id: number): Observable<AdoptionRequest[]> {
    return this.http.get<AdoptionRequest[]>(this.adoptionRequestUrl + 'adoption/' + id);
  }

  canAdopt(id: number, email: string): Observable<boolean> {
    return this.http.get<boolean>(this.adoptionRequestUrl + email + '/canadopot/' + id);
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
