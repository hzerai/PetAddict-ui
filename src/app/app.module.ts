import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './adoption-module/quiz/quiz.component';
import { ImageDirective } from './custom-directives/image.directive';
import { AdoptionComponent } from './adoption-module/adoption/adoption.component';
import { HttpClientModule } from '@angular/common/http';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
import { BackgroundDirective } from './custom-directives/background.directive';
import { FooterComponent } from './interface-module/footer/footer.component';
import { HeaderComponent } from './interface-module/header/header.component';
import { FilterComponent } from './interface-module/filter/filter.component';
import { AdsComponent } from './interface-module/ads/ads.component';
import { HomeComponent } from './interface-module/home/home.component';
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
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
