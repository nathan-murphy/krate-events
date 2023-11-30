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

  addUser(user: User) {
    this.userService.createUser(user).subscribe({
      next: () => {
        this.router.navigate(["/users"]);
      },
      error: (error) => {
        alert("Failed to create user");
        console.error(error);
      },
    });
  }
}
