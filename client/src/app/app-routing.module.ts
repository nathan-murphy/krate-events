import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./auth/login/login.component";

import { AuthGuard } from "./auth/auth.guard";
import { PotluckListComponent } from "./potlucks/potluck-list/potluck-list.component";
import { PotluckAddComponent } from "./potlucks/potluck-add/potluck-add.component";
import { PotluckViewComponent } from "./potlucks/potluck-view/potluck-view.component";
import { PotluckEditComponent } from "./potlucks/potluck-edit/potluck-edit.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UserAddComponent } from "./users/user-add/user-add.component";
import { UserEditComponent } from "./users/user-edit/user-edit.component";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "potlucks", component: PotluckListComponent, canActivate: [AuthGuard] },
  { path: "potlucks/new", component: PotluckAddComponent, canActivate: [AuthGuard] },
  { path: "potlucks/:id", component: PotluckViewComponent, canActivate: [AuthGuard] },
  { path: "potlucks/edit/:id", component: PotluckEditComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersListComponent, canActivate: [AuthGuard] },
  { path: "users/new", component: UserAddComponent, canActivate: [AuthGuard] },
  { path: "users/edit/:id", component: UserEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
