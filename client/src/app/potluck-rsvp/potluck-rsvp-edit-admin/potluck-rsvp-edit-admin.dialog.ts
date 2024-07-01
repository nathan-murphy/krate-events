import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PotluckRSVPService } from "../potluck-rsvp.service";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { User } from "src/app/users/user.model";
import { UserService } from "src/app/users/user.service";
import { FormControl, FormRecord, Validators } from "@angular/forms";

@Component({
    selector: "app-potluck-rsvp-edit-admin",
    templateUrl: "potluck-rsvp-edit-admin.dialog.html",
    // styleUrls: ["potluck-rsvp-edit-admin.dialog.css"],
})
export class PotluckRSVPEditAdminDialog implements OnInit {

    public user: User;
    public rsvpForm: FormRecord;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { rsvp: PotluckRSVP, potluckId: string },
        private potluckRsvpService: PotluckRSVPService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUser(this.data.rsvp.userId).subscribe(user => this.user = user);

        this.rsvpForm = new FormRecord({});
        this.rsvpForm.addControl("rsvp", new FormControl(this.data.rsvp.rsvp, Validators.required));
        this.rsvpForm.addControl("recipe", new FormControl(this.data.rsvp.recipe));
    }

    onSubmit() {
        const rsvpToSubmit =
        {
            _id: '', // will come from db
            userId: this.data.rsvp.userId,
            rsvp: this.rsvpForm.value["rsvp"],
            recipe: this.rsvpForm.value["recipe"],
        };

        this.potluckRsvpService.updateRsvp(rsvpToSubmit, this.data.potluckId);
    }
}