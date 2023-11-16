import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
