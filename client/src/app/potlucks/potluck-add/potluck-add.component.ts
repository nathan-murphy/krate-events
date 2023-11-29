import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';

import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-potluck-add',
    templateUrl: 'potluck-add.component.html',
    styleUrls: ['potluck-add.component.css']
})
export class PotluckAddComponent {
    
    // defaults
    startTime = '5:00 pm';
    address = '8203 Exmoor Drive';

    constructor(
        public router: Router,
        public potlucksService: PotlucksService) { }

    onAddPotluck(form: NgForm) {
        if(form.invalid)
            return;
        const potluckToAdd: Potluck = {
            startDate: form.value.startDate,
            startTime: form.value.startTime,
            theme: form.value.potluckTheme,
            description: form.value.potluckDescription,
            address: form.value.address
        }
        this.potlucksService.addPotluck(potluckToAdd);
        this.router.navigate(['potlucks']);
    }
}