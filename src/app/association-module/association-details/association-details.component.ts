import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/images-module/image.service';
import { Association } from '../Association';
import { Image } from 'src/app/images-module/Image';
import { AssociationService } from '../association.service';

@Component({
  selector: 'app-association-details',
  templateUrl: './association-details.component.html',
  styleUrls: ['./association-details.component.css']
})
export class AssociationDetailsComponent implements OnInit {
  image: Image;
  association: Association = new Association();

  constructor(private route: ActivatedRoute, private associationService: AssociationService, private imageService: ImageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.associationService.getAssociationById(id).subscribe(next => { this.association = next });
    this.imageService.getImage(`ASSOCIATION-${id}`).subscribe(next => { this.image = next });
      console.log(this.association);
  }

}
