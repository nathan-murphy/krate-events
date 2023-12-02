import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Potluck } from "../potluck.model";
import { PotluckRSVP } from "src/app/potluck-rsvp/potluck-rsvp.model";
import { User } from "src/app/users/user.model";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";

@Component({
  selector: "app-potluck-view",
  templateUrl: "potluck-view.component.html",
  styleUrls: ["potluck-view.component.css"],
})
export class PotluckViewComponent implements OnInit {
  potluck: Potluck;
  allRsvps: PotluckRSVP[];
  rsvpByStatus = { confirmed: [], pending: [], declined: [] };
  mailLink = "";

  constructor(
    private route: ActivatedRoute,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if (!id) {
      alert("No id provided");
    }

    this.potluck = this.potlucksService.getPotluckById(id);
    this.allRsvps = this.potluckRSVPService.getRsvpsByPotluckId(id);

    this.splitRsvpsByResponse();
  }

  splitRsvpsByResponse() {
    this.rsvpByStatus.confirmed = this.allRsvps.filter(
      (rsvp) => rsvp.rsvp == "yes"
    );

    this.rsvpByStatus.declined = this.allRsvps.filter(
      (rsvp) => rsvp.rsvp == "no"
    );
    this.rsvpByStatus.pending = this.allRsvps.filter((rsvp) => rsvp.rsvp == "");
  }
}
