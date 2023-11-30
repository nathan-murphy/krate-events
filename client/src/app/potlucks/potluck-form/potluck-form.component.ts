import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Potluck } from '../potluck.model';

@Component({
    selector: 'app-potluck-form',
    templateUrl: 'potluck-form.component.html',
    styleUrls: ['potluck-form.component.css']
})

export class PotluckFormComponent implements OnInit {

    @Input()
    initialPotluck: Potluck;

    @Output()
    formSubmittedEvent = new EventEmitter<Potluck>();
    
    potluckForm = new FormGroup({
        dateAndTime: new FormGroup({
            startDate: new FormControl(''),
            startTime: new FormControl('5:00 pm'),
        }),
        location: new FormControl('8203 Exmoor Drive'),
        details: new FormGroup({
            theme: new FormControl(''),
            description: new FormControl(''),
        }),
    });

    ngOnInit() {
        if(this.initialPotluck != undefined) {
            this.updatePotluckForm(this.initialPotluck)
        }
    }

    onSubmitPotluck() {
        const potluckToEmit: Potluck = {
            dateAndTime: {
                startDate: this.potluckForm.value.dateAndTime.startDate,
                startTime: this.potluckForm.value.dateAndTime.startTime
            },
            address: this.potluckForm.value.location,
            details: {
                theme: this.potluckForm.value.details.theme,
                description: this.potluckForm.value.details.description
            }
        }
        this.formSubmittedEvent.emit(potluckToEmit)
    }

    updatePotluckForm(newPotluck: Potluck) {
        this.potluckForm.patchValue(newPotluck)
    }
};

