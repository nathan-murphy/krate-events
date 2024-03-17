import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"],
})
export class LoginComponent {

  readonly errors$ = this.authService.getErrorMessageListener();

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmitLoginForm() {
    this.authService.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
