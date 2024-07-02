import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, combineLatest, filter } from "rxjs";
import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";
import { MatDialog } from "@angular/material/dialog";
import { PotluckRSVPEditDialogWithDelegate } from "src/app/potluck-rsvp/potluck-rsvp-edit-with-delegate/potluck-rsvp-edit-with-delegate.dialog";
import { PotluckRSVPEditDialogWithPlusOne } from "src/app/potluck-rsvp/potluck-rsvp-edit-with-plus-one/potluck-rsvp-edit-with-plus-one.dialog";
import { PotluckDeleteDialog } from "../potluck-delete/potluck-delete.dialog";

@Component({
  selector: "app-potluck-view",
  templateUrl: "potluck-view.component.html",
  styleUrls: ["potluck-view.component.css"],
})
export class PotluckViewComponent implements OnInit {
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

  public isLoading = false;
  public emailList: string[];
  public hostsEmailList: string[];
  public body: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private potlucksService: PotlucksService,
    private potluckRSVPService: PotluckRSVPService,
    private dialog: MatDialog
  ) { }

  onRSVP(potluckId: string) {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user.permissions.canRSVPFor != user._id) {
        this.dialog
          .open(PotluckRSVPEditDialogWithDelegate, {
            data: potluckId
          })
          .afterClosed()
          .subscribe((_) => {
            this.isLoading = true;
            window.location.reload();
          });
      } else {
        this.dialog
          .open(PotluckRSVPEditDialogWithPlusOne, {
            data: potluckId
          })
          .afterClosed()
          .subscribe((_) => {
            this.isLoading = true;
            window.location.reload();
          });
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.potluckRSVPService.getRsvpNotDeclined(params["id"])
        .subscribe(rsvps => {
          let userIds = rsvps.map(rsvp => { return rsvp.userId })
          this.userService.getUsers().subscribe(allUsers => {
            this.emailList = allUsers
              .filter(user => userIds.includes(user._id) && !user.permissions.canHost)
              .map(user => user.email);
          })
        })
      this.potlucksService.getPotluck(params["id"])
        .subscribe(potluck => {
          this.body = this.potlucksService.getReminderEmailBody(potluck);
          let hostIds = potluck.hosts;
          this.userService.getUsers().subscribe(allUsers => {
            this.hostsEmailList = allUsers
              .filter(user => hostIds.includes(user._id))
              .map(user => user.email);
          })
        })
    })
  }

  onDelete(potluckId: string) {
    this.dialog.open(PotluckDeleteDialog, {
      data: potluckId
    })
  }
}
