import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../users/user.service";
import { User } from "../users/user.model";

@Component({
  selector: "app-toolbar",
  templateUrl: "toolbar.component.html",
  styleUrls: ["toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  private emptyUser: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    permissions: { canHost: false, isAdmin: false, canRSVPFor: "" },
  };
  user: User = this.emptyUser;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.userService.getCurrentUser().subscribe((user) => (this.user = user));
    this.authService.getAuthStatusListener().subscribe((status) => {
      this.isAuthenticated = status;
      if (status)
        this.userService
          .getCurrentUser()
          .subscribe((user) => (this.user = user));
      else this.user = this.emptyUser;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
