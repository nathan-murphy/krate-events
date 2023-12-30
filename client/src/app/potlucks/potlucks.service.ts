import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Potluck } from "./potluck.model";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private allPotlucks: Potluck[] = [];
  private potlucksUpdated = new Subject<Potluck[]>();

  constructor(private httpClient: HttpClient) {}

  readonly url: string = "http://localhost:3000/api/potluck";

  getPotlucks(): Observable<Potluck[]> {
    this.httpClient
      .get<Potluck[]>(this.url)
      .subscribe((data) => {
        this.allPotlucks = data;
        this.potlucksUpdated.next([...this.allPotlucks]);
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

    this.httpClient
      .get<Potluck>(`${this.url}/${id}`)
      .subscribe((data) => potluckSubject.next(data));

    return potluckSubject.asObservable();
  }

  deletePotluck(id: string) {
    this.httpClient
      .delete(`${this.url}/${id}`)
      .subscribe({ complete: this.getPotlucks });
  }

  updatePotluck(potluck: Potluck): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();
    this.httpClient
      .put<Potluck>(`${this.url}/${potluck._id}`, potluck,)
      .subscribe((potluck) => potluckSubject.next(potluck));
    return potluckSubject.asObservable();
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
