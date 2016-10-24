import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './app.component';
import { TodoComponent } from '../todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UniversalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
