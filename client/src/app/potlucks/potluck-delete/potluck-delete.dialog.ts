import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PotlucksService } from "../potlucks.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-potluck-delete-dialog",
    templateUrl: "potluck-delete.dialog.html",
})
export class PotluckDeleteDialog {

    constructor(
        @Inject(MAT_DIALOG_DATA) public potluckId: string,
        private potlucksService: PotlucksService,
        private router: Router
    ) { }

    onDelete() {
        this.potlucksService.deletePotluck(this.potluckId).subscribe((_) => {
            this.router.navigate(["potlucks"]);
        });
    }
}