
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
import { AdoptionResolver } from './Resolvers/AdoptionResolver';
import { UserResolver } from './Resolvers/UserResolver';
import { CurrentUserFullResolver } from './Resolvers/CurrentUserFullResolver';
import { HeaderUserResolver } from './Resolvers/HeaderUserResolver';
import { UserAdoptionResolver } from './Resolvers/UserAdoptionsResolver';
import { AdminModule } from './admin-module/admin.module';
import { ValiderComponent } from './user-module/valider/valider.component';
import { AssociationListComponent } from './association-module/association-list/association-list.component';
import { VetoListComponent } from './veto-module/veto-list/veto-list.component';
import { FoundListComponent } from './lostandfound-module/found-list/found-list.component';
import { LostListComponent } from './lostandfound-module/lost-list/lost-list.component';
import { LostFormComponent } from './lostandfound-module/lost-form/lost-form.component';
import { FoundFormComponent } from './lostandfound-module/found-form/found-form.component';
import { FoundDetailsComponent } from './lostandfound-module/found-details/found-details.component';
import { LostDetailsComponent } from './lostandfound-module/lost-details/lost-details.component';
import { PostListComponent } from './post-module/post-list/post-list.component';
import { PostFormComponent } from './post-module/post-form/post-form.component';
import { PostDetailsComponent } from './post-module/post-details/post-details.component';
import { ChangepasswordComponent } from './user-module/changepassword/changepassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent, resolve: { data: HeaderUserResolver } },
  { path: 'user_profile', component: UserPageComponent, resolve: { data: CurrentUserFullResolver } },
  { path: 'visit_user_profile', component: VisitProfileComponent, resolve: { data: UserAdoptionResolver } },
  { path: 'about', component: AboutUsComponent },
  { path: 'associations', component: AssociationListComponent },
  { path: 'vetos', component: VetoListComponent },
  { path: 'adoptions', component: AdoptionListComponent },
  { path: 'adoptions/filtered', component: AdoptionListComponent },
  { path: 'adoptions/new', component: AdoptionFormComponent },
  { path: 'adoptions/:id', component: AdoptionDetailsComponent, resolve: { data: AdoptionResolver } },
  { path: 'adoptions/:id/adopter', component: AdoptionRequestComponent, resolve: { data: AdoptionResolver } },
  { path: 'adoptions/:id/edit', component: AdoptionFormComponent, resolve: { data: AdoptionResolver } },
  { path: 'founds', component: FoundListComponent },
  { path: 'losts', component: LostListComponent },
  { path: 'losts/new', component: LostFormComponent },
  { path: 'founds/new', component: FoundFormComponent },
  { path: 'founds/:id', component: FoundDetailsComponent },
  { path: 'losts/:id', component: LostDetailsComponent },
  { path: 'founds/:id/edit', component: FoundFormComponent },
  { path: 'losts/:id/edit', component: LostFormComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: PostFormComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'post/:id/edit', component: PostFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'valider', component: ValiderComponent },
  { path: 'valideruser', component: ChangepasswordComponent },

  { path: 'admin',loadChildren: () => import('./admin-module/admin.module').then(m => m.AdminModule)},
  { path: '**',  redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }