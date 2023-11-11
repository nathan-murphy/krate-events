import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';
 
@Component({
 selector: 'app-users-list',
 template: `
   <h2 class="text-center m-5">Users List</h2>
 
   <table class="table table-striped table-bordered">
       <thead>
           <tr>
               <th>First Name</th>
               <th>Last Name</th>
               <th>Action</th>
           </tr>
       </thead>
       <tbody>
           <tr *ngFor="let user of user$ | async">
               <td>{{user.fName}}</td>
               <td>{{user.lName}}</td>
               <td>
                   <button class="btn btn-primary me-1" [routerLink]="['edit/', user._id]">Edit</button>
                   <button class="btn btn-danger" (click)="deleteUser(user._id || '')">Delete</button>
               </td>
           </tr>
       </tbody>
   </table>
 
   <button class="btn btn-primary mt-3" [routerLink]="['new']">Add a New User</button>
 `
})
export class UsersListComponent implements OnInit {
 user$: Observable<User[]> = new Observable();
 
 constructor(private usersService: UserService) { }
 
 ngOnInit(): void {
   this.fetchUsers();
 }
 
 deleteUser(id: string): void {
   this.usersService.deleteUser(id).subscribe({
     next: () => this.fetchUsers()
   });
 }
 
 private fetchUsers(): void {
   this.user$ = this.usersService.getUsers();
 }
}