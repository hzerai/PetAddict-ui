import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veto } from '../Veto';
import { VetoService } from '../veto.service';
import { Image } from 'src/app/images-module/Image';
import { ImageService } from 'src/app/images-module/image.service';

@Component({
  selector: 'app-veto-details',
  templateUrl: './veto-details.component.html',
  styleUrls: ['./veto-details.component.css']
})
export class VetoDetailsComponent implements OnInit {
  veto: Veto = new Veto();
  image: Image;
  constructor(private route: ActivatedRoute, private vetoService: VetoService, private imageService: ImageService) { }

  ngOnInit(): void {
    let id = '';
    this.route.params.subscribe(next => id = next.id);
    this.vetoService.getVetoById(id).subscribe(next => { this.veto = next });
    this.imageService.getImage(`VETO-${id}`).subscribe(next => { this.image = next });
      console.log(this.veto);
  
  }

}
