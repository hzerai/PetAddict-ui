import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from './Animal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private animalUrl = environment.backUrl + "/animal/";

  constructor(private http: HttpClient) { }

  getAnimal(id): Observable<Animal> {
    return this.http.get<Animal>(this.animalUrl + id);
  }
}
