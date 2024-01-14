import { Injectable } from "@angular/core";
import { PotluckRSVP } from "./potluck-rsvp.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PotluckRSVPService {
  url = "http://localhost:3000/api/potluck-rsvp";
  constructor(private readonly httpClient: HttpClient) {}

  getRsvp(potluckId: string, status: string = ""): Observable<PotluckRSVP[]> {
    const rsvpUpdated = new Subject<PotluckRSVP[]>();
    this.httpClient
      .get<PotluckRSVP[]>(`${this.url}/${potluckId}/status/${status}`)
      .subscribe((data: PotluckRSVP[]) => {
        rsvpUpdated.next([...data]);
      });
    return rsvpUpdated.asObservable();
  }

  updateRsvp(rsvp: PotluckRSVP, potluckId: string) {
    const rsvpUpdated = new Subject<PotluckRSVP>();
    this.httpClient
      .put<PotluckRSVP>(`${this.url}/${potluckId}`, rsvp)
      .subscribe((data: PotluckRSVP) => {
        rsvpUpdated.next(data);
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
