import { Component, Input, OnChanges } from "@angular/core";
import { User } from "src/app/users/user.model";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { UserService } from "src/app/users/user.service";

@Component({
  selector: "app-potluck-rsvp-view",
  templateUrl: "potluck-rsvp-view.component.html",
  styleUrls: ["potluck-rsvp-view.component.css"],
})
export class PotluckRSVPViewComponent implements OnChanges {
  @Input()
  rsvp: PotluckRSVP;

  user: User;
  icon: string;

  constructor(private userService: UserService) {}

  ngOnChanges(): void {
    switch (this.rsvp.rsvp) {
      case "yes":
        this.icon = "check";
        break;
      case "no":
        this.icon = "cancel";
        break;
      default:
        this.icon = "hourglass_empty";
    }

    this.user = this.userService.getUserFromCache(this.rsvp.userId);
  }
}
