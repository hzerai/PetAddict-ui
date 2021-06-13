import { Injectable } from '@angular/core';
import { Adoption } from '../adoption-module/adoption/Adoption';

@Injectable({
  providedIn: 'root'
})
export class AdoptionCacheService {

  private static adoptions: Map<number, Adoption> = new Map();
  constructor() { }

  getAll(): Adoption[] {
    return Object.values(AdoptionCacheService.adoptions.values)
  }

  get(id: number): Adoption {
    return AdoptionCacheService.adoptions.get(id);
  }

  cache(adoption: Adoption): void {
    AdoptionCacheService.adoptions.set(adoption.id, adoption);
  }

  has(id: number): boolean {
    return AdoptionCacheService.adoptions.has(id);
  }

  remove(id: number): void {
    AdoptionCacheService.adoptions.delete(id);
  }
}
