import { Component, Input } from "@angular/core";
import { PotluckRSVP } from "../potluck-rsvp.model";

@Component({
  selector: "app-potluck-rsvp-list",
  templateUrl: "potluck-rsvp-list.component.html",
  styleUrls: ["potluck-rsvp-list.component.css"],
})
export class PotluckRSVPListComponent {
  @Input({ required: true }) potluckId: string;
  @Input() showBadge: boolean = false;
  @Input() rsvps: PotluckRSVP[];
  @Input() title: string = 'temp';
}