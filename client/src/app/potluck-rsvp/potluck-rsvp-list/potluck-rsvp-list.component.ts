import { Component, Input } from "@angular/core";
import { PotluckRSVP } from "../potluck-rsvp.model";

@Component({
  selector: "app-potluck-rsvp-list",
  templateUrl: "potluck-rsvp-list.component.html",
  styleUrls: ["potluck-rsvp-list.component.css"],
})
export class PotluckRSVPListComponent {
    @Input()
    rsvps: PotluckRSVP[];

    @Input()
    showBadge: boolean = false;

    @Input()
    title: string = 'temp'
}