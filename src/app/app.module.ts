import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizComponent } from './adoption-module/quiz/quiz.component';
import { BackgroundDirective } from './directives/background.directive';
import { ImageDirective } from './directives/image.directive';
import { AdoptionComponent } from './adoption-module/adoption/adoption.component';
import { HttpClientModule } from '@angular/common/http';
import { AdoptionListComponent } from './adoption-module/adoption-list/adoption-list.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    BackgroundDirective,
    ImageDirective,
    AdoptionComponent,
    AdoptionListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
