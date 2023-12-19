import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, combineLatest } from "rxjs";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";

@Component({
  selector: "app-potluck-view",
  templateUrl: "potluck-view.component.html",
  styleUrls: ["potluck-view.component.css"],
})
export class PotluckViewComponent {
  readonly vm$ = combineLatest([
    this.route.params.pipe(
      switchMap((params) => this.potlucksService.getPotluck(params["id"]))
    ),
    this.route.params.pipe(
      switchMap((params) =>
        this.potluckRSVPService.getRsvp(params["id"], "yes")
      )
    ),
    this.route.params.pipe(
      switchMap((params) => this.potluckRSVPService.getRsvp(params["id"], "no"))
    ),
    this.route.params.pipe(
      switchMap((params) =>
        this.potluckRSVPService.getRsvp(params["id"], "pending")
      )
    ),
  ]).pipe(
    map(([potluck, confirmed, declined, pending]) => {
      return {
        potluck,
        confirmed,
        declined,
        pending,
      };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService
  ) {}
}
