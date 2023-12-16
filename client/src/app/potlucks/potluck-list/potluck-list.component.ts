import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPEditDialog } from "src/app/potluck-rsvp/potluck-rsvp-edit/potluck-rsvp-edit.dialog";
import { Subscription } from "rxjs/internal/Subscription";

@Component({
  selector: "app-potluck-list",
  templateUrl: "potluck-list.component.html",
  styleUrls: ["potluck-list.component.css"],
})
export class PotluckListComponent implements OnInit, OnDestroy {
  private potluckSub: Subscription;
  allPotlucks: Potluck[] = [];
  rsvpIcon = "check_circle";

  constructor(
    public potlucksService: PotlucksService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.potlucksService.getPotlucks();
    this.potluckSub = this.potlucksService
      .getPotlucksUpdateListener()
      .subscribe((potlucks: Potluck[]) => (this.allPotlucks = potlucks));
  }

  onAttending() {
    this.dialog.open(PotluckRSVPEditDialog, {
      data: undefined,
    });
    this.rsvpIcon = "check_circle";
  }

  onNotAttending() {
    this.rsvpIcon = "cancel";
  }

  ngOnDestroy(): void {
    this.potluckSub.unsubscribe();
  }
}
