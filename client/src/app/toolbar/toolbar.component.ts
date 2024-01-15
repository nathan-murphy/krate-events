import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { User } from "../users/user.model";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "toolbar.component.html",
  styleUrls: ["toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  private emptyUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    permissions: {canHost: false, isAdmin: false}
  }
  user: User = this.emptyUser;

  
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.userService
      .getUser(this.authService.getCurrentUserId())
      .subscribe((user) => (this.user = user));
    this.authService
      .getAuthStatusListener()
      .subscribe((status) => {
        this.isAuthenticated = status;
        if(!status) {
          this.user = this.emptyUser;
        } else {
          
        }
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
