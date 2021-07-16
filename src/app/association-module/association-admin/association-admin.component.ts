import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Page } from 'src/app/adoption-module/adoption-list/adoption-list.component';
import { ImageComponent } from 'src/app/images-module/image/image.component';
import { Association } from '../Association';
import { AssociationService } from '../association.service';

@Component({
  selector: 'app-association-admin',
  templateUrl: './association-admin.component.html',
  styleUrls: ['./association-admin.component.css']
})
export class AssociationAdminComponent implements OnInit {
  associationForm: FormGroup;
  association: Association = new Association();
  asso: Association[] ;
  modif:boolean = false;
  id:number;
  page: number = 1;
  size: number = 3;
  pages: Page[];
  count: number = 0;
  filterOpen: boolean = false;
  imageName: string;
  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor(  private associationService: AssociationService) { }

  ngOnInit(): void {
    this.associationForm = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      adresse: new FormControl(),
      phone: new FormControl(),
      

    })

    
    this.associationService.getAssociations().subscribe( list => this.asso = list )
    this.associationService.count().subscribe(next => {
      this.count = next; this.generatePagination();
    });
    this.associationService.getPagedAssociations(this.page, this.size).subscribe(next => { this.asso = next });
  }

  filter() {
    this.filterOpen = !this.filterOpen;
  }
  next() {
    if(this.cantNext()){
      return;
    }
    this.page++;
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next => { this.asso = next });
      this.generatePagination();
    
  }
  previous() {
    if(this.cantPrevious()){
      return;
    }
    this.page--;
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next => { this.asso = next });
      this.generatePagination();
  }
  setPage(n: any) {
    if(n.middle){
      return;
    }
    this.page = Number(n.number);
      this.associationService.getPagedAssociations(this.page, this.size).subscribe(next => { this.asso = next });
      this.generatePagination();
  }
  cantPrevious(): boolean {
    return this.page < 2;
  }

  cantNext(): boolean {
    return this.page >= this.nbPages;
  }
  private nbPages = 0;
  generatePagination() {
    let pages: Page[] = [];

    this.nbPages = Math.ceil(this.count / this.size)

    if (this.nbPages <= 3) {
      for (let i = 1; i <= this.nbPages; i++) {
        pages.push(new Page(i, i == this.page, i == this.page + 1))
      }
    }
    else {
      pages.push(new Page(1, 1 == this.page, 1 == this.page + 1))
      pages.push(new Page(2, 2 == this.page, 2 == this.page + 1))
      pages.push(new Page(3, 3 == this.page, 3 == this.page + 1))
      if (this.page <= 3 || this.page >= this.nbPages - 2) {
        pages.push(new Page('...', false, false).isMiddle())
      } else {
        pages.push(new Page(this.page, true, false).isMiddle())
      }
      pages.push(new Page(this.nbPages - 2, this.nbPages - 2 == this.page, this.nbPages - 2 == this.page + 1))
      pages.push(new Page(this.nbPages - 1, this.nbPages - 1 == this.page, this.nbPages - 1 == this.page + 1))
      pages.push(new Page(this.nbPages, this.nbPages == this.page, this.nbPages == this.page + 1))
    }
    this.pages = pages;
  }
  showForm(){
    console.log("dddd");
    this.modif=false
   var formm =  document.getElementById("formm").style.visibility ="visible";
  }
  modifier(item){
    var formm =  document.getElementById("formm").style.visibility ="visible";
    console.log(item)
    this.associationForm.setValue({
      title: item.title, 
      description: item.description,
      adresse: item.adresse,
      phone: item.phone,
    });
    this.modif=true;
    this.id=item.id;
    this.imageName= `ASSOCIATION-${item.id}`;
    this.imageComponent.imageName= this.imageName;
    this.imageComponent.ngOnInit();
  }
  supprimer(item){
    console.log(item.id)
    this.associationService.deleteAssociation(item.id).subscribe(next => this.association = next);
    this.associationService.getAssociations().subscribe( list => this.asso = list );

  }
  onSubmit():void{
    if(this.modif){}
    this.association.title = this.associationForm.value.title
    this.association.description = this.associationForm.value.description
    this.association.adresse = this.associationForm.value.adresse
    this.association.phone = this.associationForm.value.phone
    if(this.modif){ 
      this.association.id=this.id;
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.associationService.updateAssociation(this.association).subscribe(next => this.association = next);
      this.associationService.getAssociations().subscribe( list => this.asso = list );
      
    }
    else{
    this.associationService.newAssociation(this.association).subscribe(next => {this.association = next;
      this.imageComponent.autoUpload = true;
      this.imageComponent.imageName = `ASSOCIATION-${next.id}`;
      this.imageComponent.image.name = `ASSOCIATION-${next.id}`;
      this.imageComponent.uploadImage();});
    }
    console.log(this.association)

   console.log("bbbbb");
   var formm =  document.getElementById("formm").style.visibility ="hidden";
   this.associationService.getAssociations().subscribe( list => this.asso = list );
  }

}
