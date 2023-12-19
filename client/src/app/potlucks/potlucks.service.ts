import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { Potluck } from "./potluck.model";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private allPotlucks: Potluck[] = [];
  private potlucksUpdated = new Subject<Potluck[]>();

  constructor(private httpClient: HttpClient) {}

  getPotlucks(): Observable<Potluck[]> {
    this.httpClient
      .get<Potluck[]>("http://localhost:3000/api/potluck")
      .subscribe((data) => {
        this.allPotlucks = data;
        this.potlucksUpdated.next([...this.allPotlucks]);
      });
    return this.potlucksUpdated.asObservable();
  }

  addPotluck(potluckToAdd: Potluck) {
    this.httpClient
      .post("http://localhost:3000/api/potluck", potluckToAdd)
      .subscribe({
        complete: this.getPotlucks,
      });
  }

  getPotluck(id: number): Observable<Potluck> {
    let potluckSubject = new Subject<Potluck>();

    this.httpClient
      .get<Potluck>(`http://localhost:3000/api/potluck/${id}`)
      .subscribe((data) => potluckSubject.next(data));

    return potluckSubject.asObservable();
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
