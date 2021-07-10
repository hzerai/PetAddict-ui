import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Association } from '../Association';
import { AssociationService } from '../association.service';
@Component({
  selector: 'app-association-list',
  templateUrl: './association-list.component.html',
  styleUrls: ['./association-list.component.css']
})
export class AssociationListComponent implements OnInit {

  isReadMore = true

  showText() {
     this.isReadMore = !this.isReadMore
  }
  association: Association = new Association();
  constructor(private associationService: AssociationService, private route: ActivatedRoute) { }
  ass :Association[];
  show : boolean;
  ngOnInit(): void {
  
  this.associationService.getAssociations().subscribe( list => this.ass = list )
   
   
  }
 
}
//search bar
//placeHolderSearchBar: string = 'Chercher partout : {Espece , Race , Taille, couleur, ville ...}';
//hideSearchBarResult: boolean = true;
//searchBarResult: Adoption[] = [];
//searchcontent: string = '';


//suggestions: string[] = AdoptionService.suggestions;;
//autoComplete: string[] = [];
//autoC = true;