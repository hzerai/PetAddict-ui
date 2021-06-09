
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionDetailsComponent } from './adoption-module/adoption-details/adoption-details.component';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { AdoptionFormComponent } from './adoption-module/adoption-form/adoption-form.component';
import { HomeComponent } from './interface-module/home/home.component';
import { AboutUsComponent } from './interface-module/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'adoptions', component: AdoptionListComponent },
  { path: 'adoptions/filtered', component: AdoptionListComponent },
  { path: 'adoptions/new', component: AdoptionFormComponent },
  { path: 'adoptions/:id', component: AdoptionDetailsComponent },
  { path: 'adoptions/:id/edit', component: AdoptionFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }