import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Image } from './Image';
const API_URL = 'http://localhost:8000/api/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  static cache: ImagesCacheService;

  constructor(private http: HttpClient) {
    ImageService.cache = new ImagesCacheService();
    this.getAllImages();
  }


  getAllImages() {
    this.http.get<Image[]>(API_URL ).subscribe(images => ImageService.cache.cacheAll(images));
  }

  getImage(name: string): Observable<Image> {
    return of(ImageService.cache.get(name));
  }

  updateImage(image: Image): Observable<Image> {
    ImageService.cache.cache(image);
    return this.http.put<Image>(API_URL + image.name, image);
  }

  uploadImage(image: Image): Observable<Image> {
    ImageService.cache.cache(image);
    return this.http.post<Image>(API_URL, image);
  }

  deleteImage(name: string): Observable<Image> {
    return this.http.delete<Image>(API_URL + name);
  }
}

class ImagesCacheService {

  private images: Map<string, Image> = new Map();
  constructor() { }

  getAll(): Image[] {
    return Object.values(this.images.values)
  }

  get(email: string): Image {
    return this.images.get(email);
  }

  cache(image: Image): void {
    if (!this.has(image?.name))
      this.images.set(image.name, image);
  }

  cacheAll(images: Image[]): void {
    images.forEach(image => this.images.set(image.name, image))
  }

  has(name: string): boolean {
    return this.images.has(name);
  }

  remove(name: string): void {
    this.images.delete(name);
  }

}