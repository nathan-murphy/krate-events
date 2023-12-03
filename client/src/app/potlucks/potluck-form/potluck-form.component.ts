import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Potluck } from "../potluck.model";

@Component({
  selector: "app-potluck-form",
  templateUrl: "potluck-form.component.html",
  styleUrls: ["potluck-form.component.css"],
})
export class PotluckFormComponent implements OnInit {
  @Input()
  initialPotluck: Potluck;

  @Output()
  formSubmittedEvent = new EventEmitter<Potluck>();

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
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.initialPotluck != undefined) {
      this.potluckForm.patchValue(this.initialPotluck);
    }
  }

  onSubmitPotluck() {
    const potluckToEmit: Potluck = {
      _id: this.initialPotluck._id,
      dateAndTime: {
        startDate: this.potluckForm.value.dateAndTime.startDate,
        startTime: this.potluckForm.value.dateAndTime.startTime,
      },
      address: this.potluckForm.value.location,
      details: {
        theme: this.potluckForm.value.details.theme,
        description: this.potluckForm.value.details.description,
      },
    };
    this.formSubmittedEvent.emit(potluckToEmit);
  }
}
