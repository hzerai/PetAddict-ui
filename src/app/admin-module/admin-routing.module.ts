import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdoptionResolver } from '../Resolvers/AdoptionResolver';
import { RouteGuardService } from '../user-module/_helpers/route-guard.service';
import { AdminComponent } from './admin.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';
import { UserComponent } from './user/user.component';
import { FoundComponent } from './found/found.component';
import { LostComponent } from './lost/lost.component';

const adminRoutes: Routes = [
    {
      path: 'admin',
      canActivate : [RouteGuardService],
      component: AdminComponent,
          children: [
            { path: 'user', component: UserComponent },
            { path: 'user/edit/:id', component: UserProfileEditComponent},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'adoption', component: AdoptionComponent ,resolve: { data: AdoptionResolver }},
            { path: 'found', component: FoundComponent },
            { path: 'lost', component: LostComponent },
            { path: 'post', component : PostComponent},
            { path: '**',  redirectTo: 'dashboard' },

      ]
    }
  ];
  
  @NgModule({
    imports: [ 
      RouterModule.forChild(adminRoutes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AdminRoutingModule { }