import { Component, OnInit } from "@angular/core";
import { UserService } from "../users/user.service";

@Component({
  selector: "app-toolbar",
  templateUrl: "toolbar.component.html",
  styleUrls: ["toolbar.component.css"],
})
export class ToolbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.userService.getIsAuthenticated();
    this.userService
      .getAuthStatusListener()
      .subscribe((status) => (this.isAuthenticated = status));
  }

  onLogout() {
    this.userService.logout();
  }
}
