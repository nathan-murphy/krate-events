import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPEditDialog } from "src/app/potluck-rsvp/potluck-rsvp-edit/potluck-rsvp-edit.dialog";

@Component({
  selector: "app-potluck-list",
  templateUrl: "potluck-list.component.html",
  styleUrls: ["potluck-list.component.css"],
})
export class PotluckListComponent {
  rsvpIcon = "check_circle";

  readonly potlucks$ = this.potlucksService.getPotlucks();

  constructor(
    private readonly potlucksService: PotlucksService,
    public dialog: MatDialog
  ) {}

  onAttending(potluckId: string) {
    this.dialog.open(PotluckRSVPEditDialog, {
      data: potluckId,
    });
    this.rsvpIcon = "check_circle";
  }

  onNotAttending() {
    this.rsvpIcon = "cancel";
  }
}
