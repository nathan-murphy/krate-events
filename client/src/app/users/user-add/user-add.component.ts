import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-add",
  templateUrl: "user-add.component.html",
})
export class UserAddComponent {
  constructor(private router: Router, private userService: UserService) {}

  onAddUser(user: User) {
    this.userService.addUser(user)

    this.router.navigate(["/users"]);
  }
}
