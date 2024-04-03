import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
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
    email: ["", [Validators.email, Validators.required]],
    password: ["", Validators.required],
    newPassword: ["", Validators.required],
    newPassword2: ["", Validators.required],
    permissions: this.fb.group({
      canHost: [false, Validators.required],
      isAdmin: [false, Validators.required],
    }),
  });

  id: string = undefined;
  passwordLabel: string = "password";

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.initialUser != undefined) {
      this.initialUser.password = null;
      this.updateProfileForm(this.initialUser);
      this.id = this.initialUser._id;
      this.passwordLabel = "Current Password";
    } else {
      this.userProfileForm.removeControl('newPassword');
      this.userProfileForm.removeControl('newPassword2');
    }
  }

  onSubmit() {
    // cannot use the normal .value here because controls in formGroup permissions may be disabled.
    // I don't know how to tell Angular Reactive Form that I will not ever disable it, so for now
    // just get the raw value instead.
    const eventData = this.userProfileForm.getRawValue();
    eventData["_id"] = this.id;

    if(eventData.newPassword != undefined && eventData.newPassword == eventData.newPassword2) {
      eventData.password = eventData.newPassword;
    }

    this.formSubmitted.emit(eventData);
  }

  updateProfileForm(newUserData: User) {
    this.userProfileForm.patchValue(newUserData);
  }
}
