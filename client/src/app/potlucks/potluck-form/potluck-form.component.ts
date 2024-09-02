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
import { PotluckRSVP } from "src/app/potluck-rsvp/potluck-rsvp.model";

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
  usersCanHost: Array<User>;
  numInvited: number = 0;
  formInvitedCheckboxSubscription: Subscription;
  formHostsCheckboxSubscription: Subscription;

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
    hosts: this.fb.array([]),
    invited: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((fetchedUsers) => {
      this.users = fetchedUsers;
      this.usersCanHost = fetchedUsers.filter(
        (user) => user.permissions.canHost
      );

      // https://stackoverflow.com/questions/40927167/angular-reactiveforms-producing-an-array-of-checkbox-values
      const invitedList = <FormArray>this.potluckForm.get("invited");
      this.users.forEach((_) => invitedList.push(new FormControl(false)));
      this.formInvitedCheckboxSubscription = invitedList.valueChanges.subscribe(
        (_) => {
          invitedList.setValue(
            invitedList.value.map((value: boolean, i: number) =>
              value ? this.users[i]._id : false
            ),
            { emitEvent: false }
          );
          this.numInvited = invitedList.value.filter((v) => v).length;
        }
      );

      const hostsList = <FormArray>this.potluckForm.get("hosts");
      this.usersCanHost.forEach((host) => hostsList.push(new FormControl(host._id)));
      this.formHostsCheckboxSubscription = hostsList.valueChanges.subscribe(
        (_) => {
          hostsList.setValue(
            hostsList.value.map((value: boolean, i: number) =>
              value ? this.usersCanHost[i]._id : false
            ),
            { emitEvent: false }
          );
        }
      );

      if (this.initialPotluck != undefined) {
        this.initialPotluck.invited = invitedList.value.map(
          (_, i: number) =>
            this.initialPotluck.invited.indexOf(this.users[i]._id) >= 0
        );
        this.initialPotluck.hosts = hostsList.value.map(
          (_, i: number) =>
            this.initialPotluck.hosts.indexOf(this.usersCanHost[i]._id) >= 0
        );
        this.potluckForm.patchValue(this.initialPotluck);
      }
    });
  }

  ngOnDestroy() {
    this.formInvitedCheckboxSubscription.unsubscribe();
    this.formHostsCheckboxSubscription.unsubscribe();
  }

  selectAllInvited() {
    const invitedList = <FormArray>this.potluckForm.get("invited");
    invitedList.setValue(Array(invitedList.length).fill(true));
  }
  selectNoneInvited() {
    const invitedList = <FormArray>this.potluckForm.get("invited");
    invitedList.setValue(Array(invitedList.length).fill(false));
  }
  selectAllHosting() {
    const hostingList = <FormArray>this.potluckForm.get("hosts");
    hostingList.setValue(Array(hostingList.length).fill(true));
  }
  selectNoneHosting() {
    const hostingList = <FormArray>this.potluckForm.get("hosts");
    hostingList.setValue(Array(hostingList.length).fill(false));
  }

  onSubmitPotluck() {
    let id: string = "";
    let rsvps: [PotluckRSVP];

    if (this.initialPotluck) {
      id = this.initialPotluck._id;
      rsvps = this.initialPotluck.rsvps;
    }

    const invitedList = <FormArray>this.potluckForm.controls.invited;
    const hostsList = <FormArray>this.potluckForm.controls.hosts;

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
      hosts: hostsList.value.filter((value: any) => Boolean(value)),
      invited: invitedList.value.filter((value: any) => Boolean(value)),
      rsvps: rsvps
    };

    this.formSubmittedEvent.emit(potluckToEmit);
  }
}
