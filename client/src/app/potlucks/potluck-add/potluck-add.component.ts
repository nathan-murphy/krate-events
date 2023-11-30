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
    
    constructor(
        public router: Router,
        public potlucksService: PotlucksService) { }

    addPotluck(potluckToAdd) {
        this.potlucksService.addPotluck(potluckToAdd);
        this.router.navigate(['/potlucks'])
    }
}