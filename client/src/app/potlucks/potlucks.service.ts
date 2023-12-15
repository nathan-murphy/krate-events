import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Potluck } from "./potluck.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private allPotlucks: Potluck[] = [];
  private potlucksUpdated = new Subject<Potluck[]>();

  constructor(private httpClient: HttpClient) {}

  getPotlucks() {
    this.httpClient
      .get<Potluck[]>("http://localhost:3000/api/potluck")
      .subscribe((data) => {
        this.allPotlucks = data;
        this.potlucksUpdated.next([...this.allPotlucks]);
      });
  }

  addPotluck(potluckToAdd: Potluck) {
    this.httpClient
      .post("http://localhost:3000/api/potluck", potluckToAdd)
      .subscribe({
        complete: () => {
          this.allPotlucks.push(potluckToAdd);
          this.potlucksUpdated.next([...this.allPotlucks]);
        },
      });
  }

  getPotluckById(id: number): Potluck {
    return this.allPotlucks.filter((p) => p._id == id)[0];
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
