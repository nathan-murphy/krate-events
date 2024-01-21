import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Potluck } from "./potluck.model";
import { UserService } from "../users/user.service";
import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private API_URL = environment.apiUrl + "/potluck";

  private potlucksUpdated = new Subject<Potluck[]>();

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {}

  getPotlucks(): Observable<Potluck[]> {
    this.httpClient.get<Potluck[]>(this.API_URL).subscribe((data) => {
      this.potlucksUpdated.next([...data]);
    });
    return this.potlucksUpdated.asObservable();
  }

  addPotluck(potluckToAdd: Potluck) {
    this.httpClient
      .post(this.API_URL, potluckToAdd)
      .subscribe({ complete: this.getPotlucks });
  }

  getPotluck(id: string): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();
    this.httpClient
      .get<Potluck>(`${this.API_URL}/${id}`)
      .subscribe((potluck) => {
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

  deletePotluck(id: string): Observable<string> {
    let statusSubject = new Subject<string>();
    this.httpClient
      .delete<string>(`${this.API_URL}/${id}`)
      .subscribe((result) => statusSubject.next(result));
    return statusSubject.asObservable();
  }

  updatePotluck(potluck: Potluck): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();
    this.httpClient
      .put<Potluck>(`${this.API_URL}/${potluck._id}`, potluck)
      .subscribe((potluck) => potluckSubject.next(potluck));
    return potluckSubject.asObservable();
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
