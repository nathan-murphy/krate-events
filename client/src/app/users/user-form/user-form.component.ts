import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormBuilder, FormControl, UntypedFormBuilder, Validators } from "@angular/forms";
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

  readonly allUsers$ = this.userService.getUsers();
  readonly currentUser$ = this.userService.getCurrentUser();

  userProfileForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
    // password: ["", Validators.required],
    // newPassword: ["", Validators.required],
    // newPassword2: ["", Validators.required],
    permissions: this.fb.group({
      canHost: [false, Validators.required],
      isAdmin: [false, Validators.required],
      canRSVPFor: [""]
    }),
  });

  id: string = undefined;
  passwordLabel: string = "password";

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    if (this.initialUser != undefined) { // editing an existing user
      this.initialUser.password = null;
      this.updateProfileForm(this.initialUser);
      this.id = this.initialUser._id;
      // this.passwordLabel = "Current Password";
      // if(this.initialUser.permissions.canRSVPFor == undefined) {
      //   this.initialUser.permissions.canRSVPFor = '';
      // }
    }
    else { // creating a new user
      this.initialUser = {
        _id: '0',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        permissions: {
          canHost: false,
          isAdmin: false,
          canRSVPFor: ''
        },
      }
      // this.userProfileForm.removeControl('newPassword');
      // this.userProfileForm.removeControl('newPassword2');
    }
  }
  
  updateProfileForm(newUserData: User) {
    this.userProfileForm.patchValue(newUserData);
  }

  onSubmit() {
    const eventData = this.userProfileForm.value;
    eventData["_id"] = this.id;

    // if (eventData.newPassword != undefined && eventData.newPassword == eventData.newPassword2) {
    //   eventData.password = eventData.newPassword;
    // }

    this.formSubmitted.emit(eventData as User);
  }
}
