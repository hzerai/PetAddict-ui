import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VillesService {

  public static villes: Ville[];

  constructor(private http: HttpClient) {
    if (VillesService.villes == null) {
      this.http.get<Ville[]>(environment.backUrl + '/villes').subscribe(next => VillesService.villes = next);
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