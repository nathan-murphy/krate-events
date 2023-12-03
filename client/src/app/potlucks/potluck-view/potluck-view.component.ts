import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Potluck } from "../potluck.model";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";

@Component({
  selector: "app-potluck-view",
  templateUrl: "potluck-view.component.html",
  styleUrls: ["potluck-view.component.css"],
})
export class PotluckViewComponent implements OnInit {
  potluck: Potluck;
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
    this.splitRsvpsByResponse();
  }

  splitRsvpsByResponse() {
    this.potluckRSVPService
      .getRsvpsByPotluckId(this.potluck._id)
      .forEach((rsvp) => {
        switch (rsvp.rsvp) {
          case "yes":
            this.rsvpByStatus.confirmed.push(rsvp);
            break;
          case "no":
            this.rsvpByStatus.declined.push(rsvp);
            break;
          default:
            this.rsvpByStatus.pending.push(rsvp);
        }
      });
  }
}
