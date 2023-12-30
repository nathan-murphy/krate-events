import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { User } from "../user.model";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-edit.component.ts",
  templateUrl: "user-edit.component.html",
})
export class UserEditComponent {
  readonly user$: Observable<User> = this.route.params.pipe(
    switchMap((params) => this.userService.getUser(params["id"]))
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  onUserEdit(user: User) {
    this.userService.updateUser(user).subscribe({
      next: () => {
        this.router.navigate(["/users"]);
      },
      complete: () => {
        this.router.navigate(["/users"]);
      },
      error: (error) => {
        alert("Failed to update user");
        console.error(error);
      },
    });
  }
}
