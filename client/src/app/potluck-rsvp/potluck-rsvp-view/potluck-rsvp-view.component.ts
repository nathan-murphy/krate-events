import { Component, Input, OnChanges } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "src/app/users/user.model";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { UserService } from "src/app/users/user.service";
import { PotluckRSVPService } from "../potluck-rsvp.service";
import { PotluckRSVPEditAdminDialog } from "../potluck-rsvp-edit-admin/potluck-rsvp-edit-admin.dialog";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-potluck-rsvp-view",
  templateUrl: "potluck-rsvp-view.component.html",
  styleUrls: ["potluck-rsvp-view.component.css"],
})
export class PotluckRSVPViewComponent implements OnChanges {
  @Input({ required: true }) rsvp: PotluckRSVP;
  @Input({ required: true }) potluckId: string;

  activeUser$: Observable<User>;
  user$: Observable<User>;
  icon: string;

  constructor(
    private userService: UserService,
    private potluckRSVPService: PotluckRSVPService,
    private dialog: MatDialog
  ) { }

  ngOnChanges(): void {
    this.user$ = this.userService.getUser(this.rsvp.userId);
    this.activeUser$ = this.userService.getCurrentUser();

    this.icon = this.potluckRSVPService.getIconFromRSVP(this.rsvp.rsvp);
  }

  onAdminEditRSVP(): void {
    this.dialog.open(PotluckRSVPEditAdminDialog,
      {
        data: {
          rsvp: this.rsvp,
          potluckId: this.potluckId,
        }
      })
      .afterClosed().subscribe((_) => window.location.reload());
  }
}
