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
import { VillesService } from 'src/app/user-module/villes.service';
import { Tailles } from 'src/app/interface-module/filter/Tailles';
import { Colors } from 'src/app/interface-module/filter/Colors';
import { UserService } from 'src/app/user-module/_services/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  public static cache: AdoptionCacheService;
  public static suggestions: string[];

  options = {
    responseType: 'json' as const,
  };
  private adoptionUrl = "http://localhost:8000/api/adoption";
  constructor(private http: HttpClient) {
    AdoptionService.cache = new AdoptionCacheService();
    this.getAdoptions();
    AdoptionService.suggestions = this.populateSuggestions()
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
      AdoptionService.cache.cache(next);
    })
    return adoptionFromBack;
  }

  updateAdoption(adoption: Adoption): Observable<Adoption> {
    AdoptionService.cache.remove(adoption.id);
    let adoptionFromBack = this.http.put<Adoption>(this.adoptionUrl + '/' + adoption.id, adoption, this.options);
    adoptionFromBack.subscribe(next => {
      AdoptionService.cache.cache(next);
    })
    return adoptionFromBack;
  }

  deleteAdoption(id: number): Observable<Adoption> {
    AdoptionService.cache.remove(id);
    return this.http.delete<Adoption>(this.adoptionUrl + '/' + id, this.options);
  }

  getPagedAdoptions(page: number = 1, size: number = 6): Observable<Adoption[]> {

    if (AdoptionService.cache.adoptions.size == 0) {
      let params = new HttpParams();
      params = params.append('page', String(page));
      params = params.append('size', String(size));
      return this.http.get<Adoption[]>(this.adoptionUrl, { params });
    } else {
      let offset = page < 1 ? 0 : (page - 1) * size;
      let target = size < 1 ? 6 : offset + size;
      return of(AdoptionService.cache.getAll().slice(offset, target));
    }

  }

  getPagedAdoptionsFiltered(espece, type, sexe, taille, ville, municipality, user_id, page, size) {
    let params = new HttpParams();
    if (espece != null && espece.length > 0) {
      params = params.append('espece', String(espece));
    }
    if (type != null && type.length > 0) {
      params.append('type', String(type))
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
    if (AdoptionService.cache.adoptions.size > 0) {
      let offset = page < 1 ? 0 : (page - 1) * size;
      let target = size < 1 ? 6 : offset + size;
      return of(AdoptionService.cache.getWithParams(params).slice(offset, target));
    } else {
      return this.http.get<Adoption[]>(this.adoptionUrl, { params });
    }
  }

  count(): Observable<number> {
    if (AdoptionService.cache.adoptions.size > 0) {
      return of(AdoptionService.cache.adoptions.size)
    }
    return this.http.get<number>(this.adoptionUrl + 's/count');
  }


  countFiltered(espece, type, sexe, taille, ville, municipality, user_id): number {
    return AdoptionService.cache.count(espece, type, sexe, taille, ville, municipality, user_id);
  }

  createAdoptionRequest(id: number, userId: string) {
    let result = this.http.post<AdoptionRequest>(this.adoptionUrl + '/' + id + '/adopt', this.options);
    result.subscribe(next => UserService.cache.get(userId).adoptionRequests.push(next))
    return result;
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

class AdoptionCacheService {

  public adoptions: Map<number, Adoption> = new Map();
  constructor() { }

  getAll(): Adoption[] {
    return Array.from(this.adoptions.values())
  }

  count(espece, type, sexe, taille, ville, municipality, user_id): number {
    return Array.from(this.adoptions.values()).filter(adoption => {
      if (espece != null && espece.length > 0 && adoption.animal.espece != espece) {
        return false;
      }
      if (type != null && type.length > 0 && adoption.animal.type != type) {
        return false;
      }
      if (taille != null && taille.length > 0 && adoption.animal.taille != taille) {
        return false;
      }
      if (sexe != null && sexe.length > 0 && adoption.animal.sexe != sexe) {
        return false;
      }
      if (ville != null && ville.length > 0 && adoption.user.address.ville != ville) {
        return false;
      }
      if (municipality != null && municipality.length > 0 && adoption.user.address.municipality != municipality) {
        return false;
      }
      if (user_id != null && user_id.length > 0 && adoption.user.id != Number(user_id)) {
        return false;
      }
      return true;
    }).length;
  }
  getWithParams(params: HttpParams): Adoption[] {
    let espece: string = params.get('espece');
    let type: string = params.get('type');
    let taille: string = params.get('taille');
    let sexe: string = params.get('sexe');
    let ville: string = params.get('ville');
    let municipality: string = params.get('municipality');
    let user_id: string = params.get('user_id');

    return Array.from(this.adoptions.values()).filter(adoption => {
      if (espece != null && espece.length > 0 && adoption.animal.espece != espece) {
        return false;
      }
      if (type != null && type.length > 0 && adoption.animal.type != type) {
        return false;
      }
      if (taille != null && taille.length > 0 && adoption.animal.taille != taille) {
        return false;
      }
      if (sexe != null && sexe.length > 0 && adoption.animal.sexe != sexe) {
        return false;
      }
      if (ville != null && ville.length > 0 && adoption.user.address.ville != ville) {
        return false;
      }
      if (municipality != null && municipality.length > 0 && adoption.user.address.municipality != municipality) {
        return false;
      }
      if (user_id != null && user_id.length > 0 && adoption.user.id != Number(user_id)) {
        return false;
      }
      return true;
    })
  }

  get(id: number): Adoption {
    return this.adoptions.get(id);
  }

  cache(adoption: Adoption): void {
    this.adoptions.set(adoption.id, adoption);
  }
  cacheAll(adoptions: Adoption[]): void {
    adoptions.reverse().forEach(a => {
      this.adoptions.set(a.id, a);
      AdoptionService.suggestions.push(a.title)
    })
  }

  has(id: number): boolean {
    return this.adoptions.has(id);
  }

  remove(id: number): void {
    this.adoptions.delete(id);
  }

}

