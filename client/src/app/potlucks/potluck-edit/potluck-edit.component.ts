import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";

@Component({
  selector: "app-potluck-edit",
  templateUrl: "potluck-edit.component.html",
})
export class PotluckEditComponent implements OnInit {
  initialPotluck: Potluck;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private potlucksService: PotlucksService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!id) {
      alert("No id provided");
    }

    this.initialPotluck = this.potlucksService.getPotluckById(id);
  }

  onPotluckEdit(potluckToEdit: Potluck) {
    // this.potlucksService.patchPotluck(potluckToEdit);
    this.router.navigate(["/potlucks"]);
  }
}
