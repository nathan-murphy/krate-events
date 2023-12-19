import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css']
})
export class UsersListComponent {
  readonly users$ = this.usersService.getUsers();

  displayedColumns: string[] = ['fName', 'lName', 'email', 'action'];

  constructor(private usersService: UserService) { }
}