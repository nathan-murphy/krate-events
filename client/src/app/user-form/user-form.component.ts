import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: 'user-form.html',
  styleUrls: ['user-form.css']
})

export class UserFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<User> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<User>();

  @Output()
  formSubmitted = new EventEmitter<User>();

  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  get fName() { return this.userForm.get('fName')!; }
  get lName() { return this.userForm.get('lName')!; }

  ngOnInit() {
    this.initialState.subscribe(user => {
      this.userForm = this.fb.group({
        fName: [user.fName, [Validators.required, Validators.minLength(3)]],
        lName: [user.lName, [Validators.required, Validators.minLength(5)]]
      });
    });

    this.userForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.userForm.value);
  }
}