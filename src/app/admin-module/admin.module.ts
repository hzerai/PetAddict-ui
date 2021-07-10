import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdoptionComponent } from './adoption/adoption.component';
import { PageButtonDirective } from '../custom-directives/page-button.directive';

@NgModule({
  declarations: [DashboardComponent, UserComponent, AdminComponent,UserProfileEditComponent, AdoptionComponent],
  imports: [AdminRoutingModule
,CommonModule,FormsModule,ReactiveFormsModule],
  bootstrap: [AdminComponent],
})

export class AdminModule { }
