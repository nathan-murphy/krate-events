import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { PotlucksService } from "../potlucks.service";
import { Potluck } from "../potluck.model";

@Component({
  selector: "app-potluck-list",
  templateUrl: "potluck-list.component.html",
  styleUrls: ["potluck-list.component.css"],
})
export class PotluckListComponent implements OnInit, OnDestroy {
  allPotlucks: Potluck[] = [];
  rsvpIcon = 'check_circle'
  private potlucksSub: Subscription;

  constructor(public potlucksService: PotlucksService) {}

  ngOnInit(): void {
    this.allPotlucks = this.potlucksService.getPotlucks();
    this.potlucksSub = this.potlucksService
      .getPotlucksUpdateListener()
      .subscribe({
        next: (potlucks: Potluck[]) => {
          this.allPotlucks = potlucks;
        },
        error: () => {},
        complete: () => {},
      });
  }

  ngOnDestroy(): void {
    this.potlucksSub.unsubscribe();
  }

  onAttending() {
    this.rsvpIcon = 'check_circle'
  }

  onNotAttending() {
    this.rsvpIcon = 'cancel'
  }
}
