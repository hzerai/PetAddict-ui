
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptionDetailsComponent } from './adoption-module/adoption-details/adoption-details.component';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { AdoptionFormComponent } from './adoption-module/adoption-form/adoption-form.component';
import { HomeComponent } from './interface-module/home/home.component';
import { AboutUsComponent } from './interface-module/about-us/about-us.component';
import { LoginComponent } from './user-module/login/login.component';
import { RegisterComponent } from './user-module/register/register.component';
import { AdoptionRequestComponent } from './adoption-module/adoption-request/adoption-request.component';
import { VisitProfileComponent } from './user-module/visit-profile/visit-profile.component';
import { UserPageComponent } from './user-module/user-page/user-page.component';
import { RouteGuardService } from './user-module/_helpers/route-guard.service';
import { AdminComponent } from './admin-module/admin.component';
import { UserComponent } from './admin-module/user/user.component';
import { DashboardComponent } from './admin-module/dashboard/dashboard.component';
import { AdminModule } from './admin-module/admin.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user_profile', component: UserPageComponent },
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
  { path: 'admin',canActivate : [RouteGuardService],loadChildren: () => import('./admin-module/admin.module').then(m => m.AdminModule)},
  { path: '**',  redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing: true}),AdminModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }