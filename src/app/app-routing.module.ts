
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { HomeComponent } from './interface-module/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'adoptions', component: AdoptionListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }