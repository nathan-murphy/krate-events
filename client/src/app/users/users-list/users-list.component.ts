import { Component } from "@angular/core";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../user.model";

@Component({
  selector: "app-users-list",
  templateUrl: "users-list.component.html",
  styleUrls: ["users-list.component.css"],
})
export class UsersListComponent {
  users$: Observable<User[]> = this.usersService.getUsers();

  displayedColumns: string[] = ["firstName", "lastName", "email", "action"];

  constructor(private usersService: UserService, private router: Router) {}

  onDelete(id: string) {
    this.users$ = this.usersService.deleteUser(id);
  }
}