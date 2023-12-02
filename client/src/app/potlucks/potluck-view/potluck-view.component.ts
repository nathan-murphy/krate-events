import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Potluck } from "../potluck.model";
import { PotluckRSVP } from "src/app/potluck-rsvp/potluck-rsvp.model";
import { User } from "src/app/users/user.model";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";

interface ListItemModel {
  userName: string;
  email: string;
  recipe: string;
}

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

  confirmedModel: ListItemModel[] = [];
  pendingModel: ListItemModel[] = [];
  declinedModel: ListItemModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService,
    private userService: UserService
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
    this.rsvpByStatus.confirmed.forEach((rsvp) =>
      this.confirmedModel.push({
        userName:
          this.userService.getUserFromCache(rsvp.userId).fName +
          " " +
          this.userService.getUserFromCache(rsvp.userId).lName,
        email: this.userService.getUserFromCache(rsvp.userId).email,
        recipe: rsvp.recipe,
      })
    );

    this.rsvpByStatus.declined = this.allRsvps.filter(
      (rsvp) => rsvp.rsvp == "no"
    );
    this.rsvpByStatus.declined.forEach((rsvp) =>
      this.declinedModel.push({
        userName:
          this.userService.getUserFromCache(rsvp.userId).fName +
          " " +
          this.userService.getUserFromCache(rsvp.userId).lName,
        email: this.userService.getUserFromCache(rsvp.userId).email,
        recipe: rsvp.recipe,
      })
    );

    this.rsvpByStatus.pending = this.allRsvps.filter((rsvp) => rsvp.rsvp == "");
    this.rsvpByStatus.pending.forEach((rsvp) =>
      this.pendingModel.push({
        userName:
          this.userService.getUserFromCache(rsvp.userId).fName +
          " " +
          this.userService.getUserFromCache(rsvp.userId).lName,
        email: this.userService.getUserFromCache(rsvp.userId).email,
        recipe: rsvp.recipe,
      })
    );
  }
}
