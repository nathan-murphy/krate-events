import { Injectable } from "@angular/core";
import { PotluckRSVP } from "./potluck-rsvp.model";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class PotluckRSVPService {
  private API_URL = environment.apiUrl + "/potluck-rsvp";
  constructor(private readonly httpClient: HttpClient) {}

  getRsvp(potluckId: string, status: string = ""): Observable<PotluckRSVP[]> {
    const rsvpUpdated = new Subject<PotluckRSVP[]>();
    this.httpClient
      .get<PotluckRSVP[]>(`${this.API_URL}/${potluckId}/status/${status}`)
      .subscribe((data: PotluckRSVP[]) => {
        rsvpUpdated.next([...data]);
      });
    return rsvpUpdated.asObservable();
  }

  updateRsvp(rsvp: PotluckRSVP, potluckId: string) {
    const rsvpUpdated = new Subject<PotluckRSVP>();
    this.httpClient
      .put<PotluckRSVP>(`${this.API_URL}/${potluckId}`, rsvp)
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
