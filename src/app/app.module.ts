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
import { ShowAdoptionRequestComponent } from './adoption-module/show-adoption-request/show-adoption-request.component';
import { ShowAdoptionRequestSentComponent } from './adoption-module/show-adoption-request-sent/show-adoption-request-sent.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { AssociationListComponent } from './association-module/association-list/association-list.component';
import { VetoListComponent } from './veto-module/veto-list/veto-list.component';
import {MatCardModule} from '@angular/material/card';
import { LostComponent } from './lostandfound-module/lost/lost.component';
import { FoundComponent } from './lostandfound-module/found/found.component';
import { LostListComponent } from './lostandfound-module/lost-list/lost-list.component';
import { FoundListComponent } from './lostandfound-module/found-list/found-list.component';
import { FoundDetailsComponent } from './lostandfound-module/found-details/found-details.component';
import { LostDetailsComponent } from './lostandfound-module/lost-details/lost-details.component';
import { LostFormComponent } from './lostandfound-module/lost-form/lost-form.component';
import { FoundFormComponent } from './lostandfound-module/found-form/found-form.component';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';

import { myRxStompConfig } from './my-rx-stomp.config';
import { ValiderComponent } from './user-module/valider/valider.component';
import { PostComponent } from './post-module/post/post.component';
import { PostListComponent } from './post-module/post-list/post-list.component';
import { PostDetailsComponent } from './post-module/post-details/post-details.component';
import { CommentComponent } from './post-module/comment/comment.component';
import { PostFormComponent } from './post-module/post-form/post-form.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { UserLostListComponent } from './lostandfound-module/user-lost-list/user-lost-list.component';
import { UserFoundListComponent } from './lostandfound-module/user-found-list/user-found-list.component';
/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 10000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
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
    ShowAdoptionRequestComponent,
    ShowAdoptionRequestSentComponent,
    ValiderComponent,
    AssociationListComponent,
    VetoListComponent,
    LostComponent,
    FoundComponent,
    LostListComponent,
    FoundListComponent,
    FoundDetailsComponent,
    LostDetailsComponent,
    LostFormComponent,
    FoundFormComponent,
    PostComponent,
     PostListComponent,
     PostDetailsComponent,
     CommentComponent,
     PostFormComponent,
     UserLostListComponent,
     UserFoundListComponent,
 



  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    CKEditorModule,
    MatCarouselModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [authInterceptorProviders, {
    provide: InjectableRxStompConfig,
    useValue: myRxStompConfig,
  },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
