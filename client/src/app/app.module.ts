import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatListModule } from "@angular/material/list";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";

import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";

import { AppRoutingModule } from "./app-routing.module";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserFormComponent } from "./users/user-form/user-form.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostHomeComponent } from "./posts/post-home/post-home.component";

import { AppComponent } from "./app.component";
import { EventsHomeComponent } from "./events/events-home/events-home.component";
import { AddEventComponent } from "./events/add-event/add-event.component";
import { PotluckFormComponent } from "./potlucks/potluck-form/potluck-form.component";
import { PotluckAddComponent } from "./potlucks/potluck-add/potluck-add.component";
import { PotluckListComponent } from "./potlucks/potluck-list/potluck-list.component";
import { PotluckEditComponent } from "./potlucks/potluck-edit/potluck-edit.component";
import { PotluckViewComponent } from "./potlucks/potluck-view/potluck-view.component";
import { PotluckRSVPViewComponent } from "./potluck-rsvp/potluck-rsvp-view/potluck-rsvp-view.component";
import { PotluckRSVPListComponent } from "./potluck-rsvp/potluck-rsvp-list/potluck-rsvp-list.component";
import { PotluckRSVPEditDialog } from "./potluck-rsvp/potluck-rsvp-edit/potluck-rsvp-edit.dialog";
import { LoginComponent } from "./auth/login/login.component";
import { AuthInterceptor } from "./auth/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersListComponent,
    UserFormComponent,
    UserAddComponent,
    UserEditComponent,
    PostCreateComponent,
    ToolbarComponent,
    PostListComponent,
    PostHomeComponent,
    EventsHomeComponent,
    AddEventComponent,
    PotluckFormComponent,
    PotluckAddComponent,
    PotluckListComponent,
    PotluckEditComponent,
    PotluckViewComponent,
    PotluckRSVPViewComponent,
    PotluckRSVPListComponent,
    PotluckRSVPEditDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
