
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionDetailsComponent } from './adoption-module/adoption-details/adoption-details.component';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { AdoptionFormComponent } from './adoption-module/adoption-form/adoption-form.component';
import { HomeComponent } from './interface-module/home/home.component';
import { AboutUsComponent } from './interface-module/about-us/about-us.component';
import { LoginComponent } from './user-module/login/login.component';
import { RegisterComponent } from './user-module/register/register.component';
import { UserProfileComponent } from './user-module/user-profile/user-profile.component';
import { AdoptionRequestComponent } from './adoption-module/adoption-request/adoption-request.component';
import { VisitProfileComponent } from './user-module/visit-profile/visit-profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user_profile', component: UserProfileComponent },
  { path: 'visit_user_profile', component: VisitProfileComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'adoptions', component: AdoptionListComponent },
  { path: 'adoptions/filtered', component: AdoptionListComponent },
  { path: 'adoptions/new', component: AdoptionFormComponent },
  { path: 'adoptions/:id', component: AdoptionDetailsComponent },
  { path: 'adoptions/:id/adopter', component: AdoptionRequestComponent },
  { path: 'adoptions/:id/edit', component: AdoptionFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }