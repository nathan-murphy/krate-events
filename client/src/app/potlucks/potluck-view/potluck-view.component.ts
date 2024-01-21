import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, switchMap, combineLatest } from "rxjs";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { AuthService } from "src/app/auth/auth.service";
import { UserService } from "src/app/users/user.service";
import { MatDialog } from "@angular/material/dialog";
import { PotluckRSVPEditDialog } from "src/app/potluck-rsvp/potluck-rsvp-edit/potluck-rsvp-edit.dialog";

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
    this.route.params.pipe(switchMap((_) => this.userService.getCurrentUser())),
  ]).pipe(
    map(([potluck, confirmed, declined, pending, user]) => {
      return {
        potluck,
        confirmed,
        declined,
        pending,
        user,
      };
    })
  );

  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService,
    private dialog: MatDialog
  ) {}

  onRSVP(potluckId: string) {
    this.dialog
      .open(PotluckRSVPEditDialog, {
        data: potluckId,
      })
      .afterClosed()
      .subscribe((_) => {
        this.isLoading = true;
        window.location.reload();
      });
  }

  onDelete(id: string) {
    this.potlucksService.deletePotluck(id).subscribe((_) => {
      this.router.navigate(["potlucks"]);
    });
  }
}
