import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"],
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private UserService: UserService) {}

  onSubmitLoginForm() {
    this.UserService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
