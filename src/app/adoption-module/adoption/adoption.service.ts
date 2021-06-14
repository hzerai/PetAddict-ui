import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Adoption } from './Adoption';
import { Observable, of } from 'rxjs';
import { AdoptionRequest } from '../adoption-request/AdoptionRequest';


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private static cache: AdoptionCacheService;
  private static collectionCache: AdoptionCollectionCacheService;

  options = {
    responseType: 'json' as const,
  };
  private adoptionUrl = "http://localhost:8000/api/adoption";
  constructor(private http: HttpClient) {
    AdoptionService.cache = new AdoptionCacheService();
    AdoptionService.collectionCache = new AdoptionCollectionCacheService();
    this.getAdoptions();
  }


  getAdoptions(): Observable<Adoption[]> {
    let adoptionsFromBackend = this.http.get<Adoption[]>(this.adoptionUrl);
    adoptionsFromBackend.subscribe(next => AdoptionService.cache.cacheAll(next))
    return adoptionsFromBackend;
  }


  getAdoptionById(idAsString: string): Observable<Adoption> {
    let id = Number(idAsString);
    if (AdoptionService.cache.has(id)) {
      return of(AdoptionService.cache.get(id));
    } else {
      let adoptionFromBack = this.http.get<Adoption>(this.adoptionUrl + '/' + id);
      adoptionFromBack.subscribe(next => AdoptionService.cache.cache(next))
      return adoptionFromBack;
    }
  }

  newAdoption(adoption: Adoption): Observable<Adoption> {
    let adoptionFromBack = this.http.post<Adoption>(this.adoptionUrl, adoption, this.options);
    adoptionFromBack.subscribe(next => {
      AdoptionService.cache.cache(next); AdoptionService.collectionCache.clear();
    })
    return adoptionFromBack;
  }

  updateAdoption(adoption: Adoption): Observable<Adoption> {
    AdoptionService.cache.remove(adoption.id);
    let adoptionFromBack = this.http.put<Adoption>(this.adoptionUrl + '/' + adoption.id, adoption, this.options);
    adoptionFromBack.subscribe(next => {
      AdoptionService.cache.cache(next); AdoptionService.collectionCache.clear();
    })
    return adoptionFromBack;
  }

  deleteAdoption(id: number): Observable<Adoption> {
    AdoptionService.cache.remove(id);
    AdoptionService.collectionCache.clear();
    return this.http.delete<Adoption>(this.adoptionUrl + '/' + id, this.options);
  }

  getPagedAdoptions(page: number, size: number): Observable<Adoption[]> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('size', String(size));
    let cacheKey = 'page' + page + 'size' + size;
    if (AdoptionService.collectionCache.has(cacheKey)) {
      return of(AdoptionService.collectionCache.get(cacheKey));
    } else {
      let adoptionsFromBack = this.http.get<Adoption[]>(this.adoptionUrl, { params });
      adoptionsFromBack.subscribe(next => AdoptionService.collectionCache.cache(cacheKey, next))
      return adoptionsFromBack;
    }
  }


  getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id, page, size) {
    let cacheKey = '';
    let params = new HttpParams();
    if (espece != null && espece.length > 0) {
      params = params.append('espece', String(espece));
      cacheKey += espece;
    }
    if (type != null && type.length > 0) {
      params.append('type', String(type))
      cacheKey += type;
    }
    if (sexe != null && sexe.length > 0) {
      params = params.append('sexe', String(sexe));
      cacheKey += sexe;
    }
    if (taille != null && taille.length > 0) {
      params = params.append('taille', String(taille));
      cacheKey += taille;
    }
    if (ville != null && ville.length > 0) {
      params = params.append('ville', String(ville));
      cacheKey += ville;
    }
    if (municipality != null && municipality.length > 0) {
      params = params.append('municipality', String(municipality));
      cacheKey += municipality;
    }
    if (user_id != null && user_id.length > 0) {
      params = params.append('user_id', String(user_id));
      cacheKey += String(user_id);
    }
    if (page != null) {
      params = params.append('page', String(page))
      cacheKey += 'page' + String(page);
    }
    if (size != null) {
      params = params.append('size', String(size))
      cacheKey += 'size' + String(size);
    }
    if (AdoptionService.collectionCache.has(cacheKey)) {
      return of(AdoptionService.collectionCache.get(cacheKey));
    } else {
      let adoptionsFromBack = this.http.get<Adoption[]>(this.adoptionUrl, { params });
      adoptionsFromBack.subscribe(next => AdoptionService.collectionCache.cache(cacheKey, next))
      return adoptionsFromBack;
    }
  }

  count(): Observable<number> {
    return this.http.get<number>(this.adoptionUrl + 's/count');
  }

  createAdoptionRequest(id: number) {
    return this.http.post<AdoptionRequest>(this.adoptionUrl + '/' + id + '/adopt', this.options);
  }

}

class AdoptionCacheService {

  private adoptions: Map<number, Adoption> = new Map();
  constructor() { }

  getAll(): Adoption[] {
    return Object.values(this.adoptions.values)
  }

  get(id: number): Adoption {
    return this.adoptions.get(id);
  }

  cache(adoption: Adoption): void {
    this.adoptions.set(adoption.id, adoption);
  }
  cacheAll(adoptions: Adoption[]): void {
    adoptions.forEach(a => {
      this.adoptions.set(a.id, a);
    })
  }

  has(id: number): boolean {
    return this.adoptions.has(id);
  }

  remove(id: number): void {
    this.adoptions.delete(id);
  }

}


class AdoptionCollectionCacheService {

  private adoptions: Map<string, Adoption[]> = new Map();
  constructor() { }

  get(query: string): Adoption[] {
    return this.adoptions.get(query);
  }

  cache(query: string, adoptions: Adoption[]): void {
    this.adoptions.set(query, adoptions);
  }

  has(query: string): boolean {
    return this.adoptions.has(query);
  }

  clear(): void {
    this.adoptions = new Map();
  }

}