import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  public static villes: Ville[];

  constructor(private http: HttpClient) {
    if (VillesService.villes == null) {
      this.http.get<Ville[]>('http://localhost:8000/api/villes').subscribe(next => VillesService.villes = next);
    }
  }
}

export class Ville {
  name: string;
  municipalities: Municipality[];
}

export class Municipality {
  name: string;
}