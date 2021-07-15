import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';
import { AdoptionService } from '../adoption/adoption.service';
import { Temoignage } from './Temoignage';

@Component({
  selector: 'app-temoignages',
  templateUrl: './temoignages.component.html',
  styleUrls: ['./temoignages.component.css']
})
export class TemoignagesComponent implements OnInit {
  temoignages: any[];
  images: Map<number, Image> = new Map();
  constructor(private adoptionSerive: AdoptionService, private imageService: ImageService) { }

  ngOnInit(): void {
    this.adoptionSerive.getAllTemoignage().subscribe(next => {
      this.temoignages = next;
      this.temoignages.forEach(t => this.imageService.getImage('ADOPTION-' + t.adoption.adoptionId).subscribe(i => {
        if (i) {
          t.image = i.bytes;

        } else {
          t.image = 'https://placedog.net/500/280?id=' + (t?.adoption.adoptionId > 200 ? t?.adoption.adoptionId - 100 : t?.adoption.adoptionId)
        }
      }))
    })
  }


}
