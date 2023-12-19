import { Injectable } from "@angular/core";
import { PotluckRSVP } from "./potluck-rsvp.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PotluckRSVPService {
  constructor(private readonly httpClient: HttpClient) {}

  getRsvp(id: number, status: string = ""): Observable<PotluckRSVP[]> {
    let rsvpUpdated = new Subject<PotluckRSVP[]>();
    this.httpClient
      .get<PotluckRSVP[]>(
        `http://localhost:3000/api/potluck-rsvp/${id}/status/${status}`
      )
      .subscribe((data) => {
        rsvpUpdated.next([...data]);
      });
    return rsvpUpdated.asObservable();
  }

  getIconFromRSVP(rsvp: string): string {
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
