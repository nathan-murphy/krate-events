import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";

import { PostHomeComponent } from "./posts/post-home/post-home.component";
import { EventsHomeComponent } from "./events/events-home/events-home.component";
import { AddEventComponent } from "./events/add-event/add-event.component";

import { PotluckListComponent } from "./potlucks/potluck-list/potluck-list.component";
import { PotluckAddComponent } from "./potlucks/potluck-add/potluck-add.component";
import { PotluckViewComponent } from "./potlucks/potluck-view/potluck-view.component";
import { PotluckEditComponent } from "./potlucks/potluck-edit/potluck-edit.component";

const routes: Routes = [
  { path: "", redirectTo: "potlucks", pathMatch: "full" },
  { path: "potlucks", component: PotluckListComponent },
  { path: "potlucks/new", component: PotluckAddComponent },
  { path: "potlucks/:id", component: PotluckViewComponent },
  { path: "potlucks/edit/:id", component: PotluckEditComponent },
  { path: "users", component: UsersListComponent },
  { path: "users/new", component: UserAddComponent },
  { path: "users/edit/:id", component: UserEditComponent },
  { path: "udemyCourse", component: PostHomeComponent },
  { path: "events", component: EventsHomeComponent },
  { path: "events/new", component: AddEventComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
