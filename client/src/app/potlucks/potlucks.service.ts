import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Potluck } from "./potluck.model";
import { UserService } from "../users/user.service";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private potlucksUpdated = new Subject<Potluck[]>();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  readonly url: string = "http://localhost:3000/api/potluck";

  getPotlucks(): Observable<Potluck[]> {
    this.httpClient.get<Potluck[]>(this.url).subscribe((data) => {
      this.potlucksUpdated.next([...data]);
    });
    return this.potlucksUpdated.asObservable();
  }

  addPotluck(potluckToAdd: Potluck) {
    this.httpClient
      .post(this.url, potluckToAdd)
      .subscribe({ complete: this.getPotlucks });
  }

  getPotluck(id: string): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();
    this.httpClient.get<Potluck>(`${this.url}/${id}`).subscribe((potluck) => {
      this.userService.getUsers().subscribe((allUsers) => {
        
        potluck.createdByAsUser = allUsers.find(
          (user) => user._id == potluck.createdBy
        );

        potluck.hostsAsUsers = potluck.hosts.map((hostId) =>
          allUsers.find((user) => user._id == hostId)
        );

        potluckSubject.next(potluck);
      });
    });

    return potluckSubject.asObservable();
  }

  deletePotluck(id: string):Observable<string> {
    let statusSubject = new Subject<string>;
    this.httpClient
      .delete<string>(`${this.url}/${id}`)
      .subscribe(result => statusSubject.next(result));
    return statusSubject.asObservable();
  }

  updatePotluck(potluck: Potluck): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();
    this.httpClient
      .put<Potluck>(`${this.url}/${potluck._id}`, potluck)
      .subscribe((potluck) => potluckSubject.next(potluck));
    return potluckSubject.asObservable();
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
