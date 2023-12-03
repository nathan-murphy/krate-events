import { Injectable } from "@angular/core";
import { PotluckRSVP } from "./potluck-rsvp.model";
import { samplePotluckRSVPs } from "./helpers";

@Injectable({ providedIn: "root" })
export class PotluckRSVPService {
  getRsvpsByPotluckId(id: number): PotluckRSVP[] {
    return samplePotluckRSVPs.filter((rsvp) => rsvp.potluckId == id);
  }

  getIconFromRSVP(rsvp: string): string{
    switch (rsvp) {
      case "yes":
        return "check";
      case "no":
        return "cancel";
      default:
        return "hourglass_empty";
    }
  }
}
