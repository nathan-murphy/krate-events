import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "../user.model";

@Component({
  selector: "app-user-form",
  templateUrl: "user-form.html",
  styleUrls: ["user-form.css"],
})
export class UserFormComponent implements OnInit {
  @Input()
  initialUser: User;

  @Output()
  formSubmitted = new EventEmitter<User>();

  userProfileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.initialUser != undefined) {
      this.updateProfileForm(this.initialUser);
    }
  }

  onSubmit() {
    this.formSubmitted.emit(this.userProfileForm.value);
  }

  updateProfileForm(newUserData: User) {
    this.userProfileForm.patchValue({
      firstName: newUserData.firstName,
      lastName: newUserData.lastName,
      email: newUserData.email,
    });
  }
}
