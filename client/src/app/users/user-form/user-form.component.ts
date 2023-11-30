import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable, BehaviorSubject } from "rxjs";
import { User } from "../user.model";
import { UserService } from "../user.service";

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

  userProfileForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    email: new FormControl(""),
  });

  constructor() {}

  ngOnInit(): void {
    if (this.initialUser != undefined) {
      this.updateProfileForm(this.initialUser);
    }
  }

  onSubmit() {
    this.formSubmitted.emit(this.userProfileForm.value);
    console.warn(this.userProfileForm.value);
  }

  updateProfileForm(newUserData: User) {
    this.userProfileForm.patchValue({
      firstName: newUserData.fName,
      lastName: newUserData.lName,
      email: newUserData.email,
    });
  }
}
