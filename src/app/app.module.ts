import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './loginpage/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoginService } from './services/loginservices';
import { CookieService } from 'ngx-cookie-service';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesService } from './services/notesservice';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    NotesListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'notes', component: NotesListComponent }
    ]),
    BrowserAnimationsModule
  ],
  providers: [LoginService, CookieService, NotesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 