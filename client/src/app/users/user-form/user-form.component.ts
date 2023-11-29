import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.html',
  styleUrls: ['user-form.css']
})

export class UserFormComponent implements OnInit {
  users$: Observable<User[]> = new Observable();

  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private usersService: UserService) { }

  get fName() { return this.userForm.get('fName')!; }
  get lName() { return this.userForm.get('lName')!; }
  get attachedToId() { return this.userForm.get('attachedToId')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.userForm = this.fb.group({
        fName: [user.fName, [Validators.required, Validators.minLength(3)]],
        lName: [user.lName, [Validators.required, Validators.minLength(5)]],
        // attachedToId: [user.attachedTo]
      });
    });

    this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });

    this.users$ = this.usersService.getUsers();
  }

  submitForm() {
    this.formSubmitted.emit(this.userForm.value);
  }
}