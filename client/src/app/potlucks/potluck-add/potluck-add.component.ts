import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";

@Component({
    selector: 'app-potluck-add',
    templateUrl: 'potluck-add.component.html',
    styleUrls: ['potluck-add.component.css']
})
export class PotluckAddComponent {
    
    constructor(
        public router: Router,
        public potlucksService: PotlucksService) { }

    onAddPotluck(potluckToAdd: Potluck) {
        this.potlucksService.addPotluck(potluckToAdd);
        this.router.navigate(['/potlucks'])
    }
}