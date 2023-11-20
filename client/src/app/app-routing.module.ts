import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { PostHomeComponent } from './posts/post-home/post-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'udemyCourse', pathMatch: 'full' },
  { path: 'users', component: UsersListComponent },
  { path: 'users/new', component: AddUserComponent },
  { path: 'users/edit/:id', component: EditUserComponent },
  { path: 'udemyCourse', component: PostHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }