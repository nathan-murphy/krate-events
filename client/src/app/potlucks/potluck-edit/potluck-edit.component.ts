import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-potluck-edit",
  templateUrl: "potluck-edit.component.html",
})
export class PotluckEditComponent {
  readonly potluck$ = this.route.params.pipe(
    switchMap(params => this.potlucksService.getPotluck(params['id']))
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potlucksService: PotlucksService
  ) {}

  onPotluckEdit(potluckToEdit: Potluck) {
    // alert('edit receieved with id: ' + potluckToEdit._id)
    this.potlucksService.updatePotluck(potluckToEdit);
    this.router.navigate(["/potlucks", potluckToEdit._id]);
  }
}
