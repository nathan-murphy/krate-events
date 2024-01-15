import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap, combineLatest } from "rxjs";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "src/app/users/user.service";

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
    this.route.params.pipe(
      switchMap((params) =>
        this.userService.getUser(this.authService.getCurrentUserId())
      )
    ),
  ]).pipe(
    map(([potluck, confirmed, declined, pending, user]) => {
      return {
        potluck,
        confirmed,
        declined,
        pending,
        user
      };
    })
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService
  ) {}

  onDelete(id: string) {
    this.potlucksService.deletePotluck(id).subscribe((result) => {
      this.router.navigate(["potlucks"]);
    });
  }
}
