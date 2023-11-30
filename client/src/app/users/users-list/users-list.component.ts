import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.css']
})
export class UsersListComponent implements OnInit {
  allUsers: User[];
  displayedColumns: string[] = ['fName', 'lName', 'email', 'action'];

  constructor(private usersService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.allUsers= this.usersService.getUsers();
  }
}