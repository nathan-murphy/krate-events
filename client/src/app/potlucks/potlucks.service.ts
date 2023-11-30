import { Potluck } from "./potluck.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { samplePotlucks } from "./helpers";

@Injectable({ providedIn: "root" })
export class PotlucksService {
  private allPotlucks: Potluck[] = samplePotlucks;
  private potlucksUpdated = new Subject<Potluck[]>();

  getPotlucks() {
    return [...this.allPotlucks];
  }

  addPotluck(potluckToAdd: Potluck) {
    this.allPotlucks.push(potluckToAdd);
    this.potlucksUpdated.next([...this.allPotlucks]);
  }

  getPotluckById(id: number): Potluck {
    return this.allPotlucks.filter(p => p._id == id)[0]
  }

  getPotlucksUpdateListener() {
    return this.potlucksUpdated.asObservable();
  }
}
