import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animal } from './Animal';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private static cache: AnimalCacheService;
  private animalUrl = "http://localhost:8000/api/animal";

  constructor(private http: HttpClient) {
    AnimalService.cache = new AnimalCacheService();
    this.getAnimalsFromDb();

  }

  getAnimalsFromDb(): Observable<Animal[]> {
    let animalsFromBackend = this.http.get<Animal[]>(this.animalUrl);
    animalsFromBackend.subscribe(next => AnimalService.cache.cacheAll(next))
    return animalsFromBackend;
  }
  getAnimals() {
   return AnimalService.cache;
  }
}

export class AnimalCacheService {

  public animals: Map<number, Animal> = new Map();
  constructor() { }


  getAll(): Animal[] {
    return Object.values(this.animals.values)
  }

  get(id: number): Animal {
    return this.animals.get(id);
  }

  cache(animal: Animal): void {
    this.animals.set(animal.id, animal);
  }
  cacheAll(animals: Animal[]): void {
    animals.forEach(a => {
      this.animals.set(a.id, a);
    })
  }

  has(id: number): boolean {
    return this.animals.has(id);
  }

  remove(id: number): void {
    this.animals.delete(id);
  }

}