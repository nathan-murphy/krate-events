import {
  Component,
  Input,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Potluck } from "../potluck.model";
import { UserService } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-potluck-form",
  templateUrl: "potluck-form.component.html",
  styleUrls: ["potluck-form.component.css"],
})
export class PotluckFormComponent implements OnInit, OnDestroy {
  @Input()
  initialPotluck: Potluck;

  @Output()
  formSubmittedEvent = new EventEmitter<Potluck>();

  users: Array<User>;
  formCheckboxSubscription: Subscription;

  potluckForm = this.fb.group({
    dateAndTime: this.fb.group({
      startDate: ["", Validators.required],
      startTime: ["5:00 pm", Validators.required],
    }),
    location: ["Krate House", Validators.required],
    details: this.fb.group({
      theme: ["", Validators.required],
      description: ["", Validators.required],
    }),
    invited: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    if (this.initialPotluck != undefined) {
      this.potluckForm.patchValue(this.initialPotluck);
    }

    this.userService.getUsers().subscribe((fetchedUsers) => {
      this.users = fetchedUsers;

      // https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
      const invitedList = <FormArray>this.potluckForm.get("invited");
      this.users.forEach((user) => invitedList.push(new FormControl(false)));

      this.formCheckboxSubscription = invitedList.valueChanges.subscribe(
        (_) => {
          invitedList.setValue(
            invitedList.value.map((value: boolean, i: number) =>
              value ? this.users[i]._id : false
            ),
            { emitEvent: false }
          );
        }
      );
    });
  }

  ngOnDestroy() {
    this.formCheckboxSubscription.unsubscribe();
  }

  onSubmitPotluck() {
    let id: string = "";
    if (this.initialPotluck) id = this.initialPotluck._id;

    const invitedList = <FormArray>this.potluckForm.controls.invited;

    const potluckToEmit: Potluck = {
      _id: id,
      dateAndTime: {
        startDate: this.potluckForm.value.dateAndTime.startDate,
        startTime: this.potluckForm.value.dateAndTime.startTime,
      },
      address: this.potluckForm.value.location,
      details: {
        theme: this.potluckForm.value.details.theme,
        description: this.potluckForm.value.details.description,
      },
      invited: invitedList.value.filter((value: any) => Boolean(value)),
    };

    this.formSubmittedEvent.emit(potluckToEmit);
  }
}
