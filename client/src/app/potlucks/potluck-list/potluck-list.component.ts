import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { PotlucksService } from "../potlucks.service";
import { PotluckRSVPEditDialogWithDelegate } from "src/app/potluck-rsvp/potluck-rsvp-edit-with-delegate/potluck-rsvp-edit-with-delegate.dialog";
import { PotluckRSVPEditDialogWithPlusOne } from "src/app/potluck-rsvp/potluck-rsvp-edit-with-plus-one/potluck-rsvp-edit-with-plus-one.dialog";
import { PotluckRSVP } from "src/app/potluck-rsvp/potluck-rsvp.model";
import { PotluckRSVPService } from "src/app/potluck-rsvp/potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";

@Component({
  selector: "app-potluck-list",
  templateUrl: "potluck-list.component.html",
  styleUrls: ["potluck-list.component.css"],
})
export class PotluckListComponent {
  readonly potlucks$ = this.potlucksService.getPotlucks();

  readonly confirmedIcon : string = this.potluckRsvpService.getIconFromRSVP('yes');
  readonly pendingIcon : string = this.potluckRsvpService.getIconFromRSVP('no');
  readonly declinedIcon : string = this.potluckRsvpService.getIconFromRSVP('');

  constructor(
    private readonly potlucksService: PotlucksService,
    private readonly userService: UserService,
    private potluckRsvpService: PotluckRSVPService,
    public dialog: MatDialog
  ) { }

  onAttending(potluckId: string) {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user.permissions.canRSVPFor != user._id) {
        this.dialog.open(PotluckRSVPEditDialogWithDelegate, {
          data: potluckId
        })
      } else {
        this.dialog.open(PotluckRSVPEditDialogWithPlusOne, {
          data: potluckId
        })
      }
    });
  }

  onNotAttending(potluckId: string) {
    const rsvp: PotluckRSVP = {
      _id: "", // will come from db
      userId: "", // will come from request header
      rsvp: "no",
      recipe: "",
    };
    this.potluckRsvpService.updateRsvp(rsvp, potluckId);
  }
}
