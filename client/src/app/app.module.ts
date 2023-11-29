import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
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
import { MatSidenavModule } from "@angular/material/sidenav";

import { MatNativeDateModule } from "@angular/material/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";

import { AppRoutingModule } from "./app-routing.module";
import { UsersListComponent } from "./users-list/users-list.component";
import { UserFormComponent } from "./user-form/user-form.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostHomeComponent } from "./posts/post-home/post-home.component";

import { AppComponent } from "./app.component";
import { EventsHomeComponent } from "./events/events-home/events-home.component";
import { AddEventComponent } from "./events/add-event/add-event.component";
import { EventsService } from "./events/events.service";
import { PotluckAddComponent } from "./events/potlucks/potluck-add/potluck-add.component";
import { PotluckListComponent } from "./potluck-list/potluck-list.component";
import { PotlucksService } from "./events/potlucks/potlucks.service";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserFormComponent,
    AddUserComponent,
    EditUserComponent,
    PostCreateComponent,
    ToolbarComponent,
    PostListComponent,
    PostHomeComponent,
    EventsHomeComponent,
    AddEventComponent,
    PotluckAddComponent,
    PotluckListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatExpansionModule,
    FormsModule,
    MatStepperModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [EventsService, PotlucksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
