import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersListComponent } from "./users-list/users-list.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";

import { PostHomeComponent } from "./posts/post-home/post-home.component";
import { EventsHomeComponent } from "./events/events-home/events-home.component";
import { AddEventComponent } from "./events/add-event/add-event.component";
import { PotluckAddComponent } from "./events/potlucks/potluck-add/potluck-add.component";
import { PotluckListComponent } from "./potluck-list/potluck-list.component";

const routes: Routes = [
  { path: "", redirectTo: "potlucks", pathMatch: "full" },
  { path: "potlucks", component: PotluckListComponent },
  { path: "potlucks/new", component: PotluckAddComponent },
  { path: "users", component: UsersListComponent },
  { path: "users/new", component: AddUserComponent },
  { path: "users/edit/:id", component: EditUserComponent },
  { path: "udemyCourse", component: PostHomeComponent },
  { path: "events", component: EventsHomeComponent },
  { path: "events/new", component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
