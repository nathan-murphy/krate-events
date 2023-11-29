import { Component, OnInit } from "@angular/core";
import { NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EventsService } from "../events.service";


@Component({
    selector: 'app-add-event',
    templateUrl: 'add-event.component.html',
    styleUrls: ['add-event.component.css']
})
export class AddEventComponent implements OnInit {
    eventTypeGroup = this._formBuilder.group({
        eventTypeControl: ['', Validators.required],
    });

    isLinear = true;

    eventTypes: string[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        public eventsService: EventsService) { }

    onAddEvent(form: NgForm) {

    }

    ngOnInit() {
        this.eventTypes = this.eventsService.getEventTypes();
    }
}