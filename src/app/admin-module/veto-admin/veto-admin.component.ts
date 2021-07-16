import { Component, OnInit, Query, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageComponent } from 'src/app/admin-module/image/image.component';
import { Page } from 'src/app/adoption-module/adoption-list/adoption-list.component';
import { Veto } from '../../veto-module/Veto';

import { VetoService } from '../../veto-module/veto.service';

@Component({
  selector: 'app-veto-admin',
  templateUrl: './veto-admin.component.html',
  styleUrls: ['./veto-admin.component.css']
})
export class VetoAdminComponent implements OnInit {
  page: number = 1;
  size: number = 3;
  count: number = 0;
  veto: Veto[];
  Vett: Veto = new Veto();
  id: number;
  keyword: string = '';
  pages: Page[];
  vetoForm: FormGroup;
  filterOpen: boolean = false;
  modif: boolean = false;
  imageName: string;
  @ViewChild(ImageComponent)
  imageComponent: ImageComponent;
  constructor(private vetoService: VetoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.vetoForm = new FormGroup({
      docteur: new FormControl(),
      description: new FormControl(),
      adresse: new FormControl(),
      phone: new FormControl(),
    })
    this.vetoService.count().subscribe(next => {
      this.count = next; this.generatePagination();
    });
    this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next });
  }



  filter() {
    this.filterOpen = !this.filterOpen;
  }
  next() {
    if (this.cantNext()) {
      return;
    }
    this.page++;
    this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next });
    this.generatePagination();

  }

  previous() {
    if (this.cantPrevious()) {
      return;
    }
    this.page--;
    this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next });
    this.generatePagination();
  }
  setPage(n: any) {
    if (n.middle) {
      return;
    }
    this.page = Number(n.number);
    this.vetoService.getPagedVetos(this.page, this.size).subscribe(next => { this.veto = next });
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


  showForm() {
    this.modif = false
    var formm = document.getElementById("formm").style.visibility = "visible";
  }

  modifier(item) {
    var formm = document.getElementById("formm").style.visibility = "visible";
    console.log(item)
    this.vetoForm.setValue({
      docteur: item.docteur,
      description: item.description,
      adresse: item.adresse,
      phone: item.phone,
    });
    this.modif = true;
    this.id = item.id;
    this.imageName = `VETO-${item.id}`;
    this.imageComponent.imageName = this.imageName;
    this.imageComponent.ngOnInit();
  }

  supprimer(item) {
    console.log(item.id)
    this.vetoService.deleteVeto(item.id).subscribe(next => this.Vett = next);
    this.ngOnInit();
  }

  onSubmit(): void {
    if (this.modif) { }
    this.Vett.docteur = this.vetoForm.value.docteur
    this.Vett.description = this.vetoForm.value.description
    this.Vett.adresse = this.vetoForm.value.adresse
    this.Vett.phone = this.vetoForm.value.phone
    if (this.modif) {
      this.Vett.id = this.id;
      this.imageComponent.autoUpload = true;
      this.imageComponent.uploadImage();
      this.vetoService.updateVeto(this.Vett).subscribe(next => this.Vett = next);
      this.ngOnInit()

    }
    else {
      this.vetoService.newVeto(this.Vett).subscribe(next => {
        this.Vett = next;
        this.imageComponent.autoUpload = true;
        this.imageComponent.imageName = `VETO-${next.id}`;
        this.imageComponent.image.name = `VETO-${next.id}`;
        this.imageComponent.uploadImage();
      });
      // window.location.reload();
    }
    console.log(this.Vett)

    console.log("bbbbb");
    var formm = document.getElementById("formm").style.visibility = "hidden";
    this.ngOnInit()
  }
  fetch() {
    if (this.keyword?.length == 0) {
      this.ngOnInit();
      return;
    }
    if (this.keyword?.length > 3) {
      this.vetoService.elasticSearch(this.keyword).subscribe(next => {
        this.veto = next;
      });
    }
  }
}
