import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { createPopper } from "@popperjs/core";

import { AppComponent } from './app.component';
import { QuizComponent } from './adoption-module/quiz/quiz.component';
import { ImageDirective } from './custom-directives/image.directive';
import { AdoptionComponent } from './adoption-module/adoption/adoption.component';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { BackgroundDirective } from './custom-directives/background.directive';
import { FooterComponent } from './interface-module/footer/footer.component';
import { HeaderComponent } from './interface-module/header/header.component';
import { FilterComponent } from './interface-module/filter/filter.component';
import { AdsComponent } from './interface-module/ads/ads.component';
import { HomeComponent } from './interface-module/home/home.component';
import { AdoptionDetailsComponent } from './adoption-module/adoption-details/adoption-details.component';
import { AdoptionFormComponent } from './adoption-module/adoption-form/adoption-form.component';
import { AdoptionRequestComponent } from './adoption-module/adoption-request/adoption-request.component';
import { AboutUsComponent } from './interface-module/about-us/about-us.component';
import { LoginComponent } from './user-module/login/login.component';
import { RegisterComponent } from './user-module/register/register.component';
import { authInterceptorProviders } from './user-module/_helpers/auth.interceptor';
import { UserProfileComponent } from './user-module/user-profile/user-profile.component';
import { BackButtonDirective } from './custom-directives/back-button.directive';
import { UserProfileEditComponent } from './user-module/user-profile-edit/user-profile-edit.component';
import { UserProfileShowComponent } from './user-module/user-profile-show/user-profile-show.component';
import { SideFilterDirective } from './custom-directives/side-filter.directive';
import { VisitProfileComponent } from './user-module/visit-profile/visit-profile.component';
import { PageButtonDirective } from './custom-directives/page-button.directive';
import { MessageComponent } from './user-module/messages-module/message/message.component';
import { InboxComponent } from './user-module/messages-module/inbox/inbox.component';
import { UserPageComponent } from './user-module/user-page/user-page.component';
import { NotificationComponent } from './user-module/notification-module/notification/notification.component';
import { ImageComponent } from './images-module/image/image.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ReceivedAdoptionComponent } from './adoption-module/received-adoption/received-adoption.component';
import { ShowAdoptionRequestComponent } from './adoption-module/show-adoption-request/show-adoption-request.component';
import { ShowAdoptionRequestSentComponent } from './adoption-module/show-adoption-request-sent/show-adoption-request-sent.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    BackgroundDirective,
    ImageDirective,
    AdoptionComponent,
    AdoptionListComponent,
    FooterComponent,
    HeaderComponent,
    FilterComponent,
    AdsComponent,
    HomeComponent,
    AdoptionDetailsComponent,
    AdoptionFormComponent,
    AdoptionRequestComponent,
    AboutUsComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    BackButtonDirective,
    UserProfileEditComponent,
    UserProfileShowComponent,
    SideFilterDirective,
    VisitProfileComponent,
    PageButtonDirective,
    MessageComponent,
    InboxComponent,
    UserPageComponent,
    NotificationComponent,
    ImageComponent,
    ReceivedAdoptionComponent,
    ShowAdoptionRequestComponent,
    ShowAdoptionRequestSentComponent,
    


  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCarouselModule.forRoot(),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
