import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Veto } from '../Veto';
import { VetoService } from '../veto.service';

@Component({
  selector: 'app-veto-list',
  templateUrl: './veto-list.component.html',
  styleUrls: ['./veto-list.component.css']
})
export class VetoListComponent implements OnInit {
  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }
  association: Veto = new Veto();
  constructor(private vetoService: VetoService, private route: ActivatedRoute) { }
  veto :Veto[];
  show : boolean;
  ngOnInit(): void {
    
  this.vetoService.getVeto().subscribe( list => this.veto = list )
   
  }
}
