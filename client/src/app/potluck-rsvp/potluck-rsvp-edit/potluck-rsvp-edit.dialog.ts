import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormRecord, FormControl, Validators } from "@angular/forms";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { PotluckRSVPService } from "../potluck-rsvp.service";

@Component({
  selector: "app-potluck-rsvp-edit",
  templateUrl: "potluck-rsvp-edit.dialog.html",
  styleUrls: ["potluck-rsvp-edit.dialog.css"],
})
export class PotluckRSVPEditDialog implements OnInit {
  public rsvpForm: FormRecord;
  private recipeText: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public potluckId: string,
    private potluckRsvpService: PotluckRSVPService
  ) {}

  onSubmitRsvp() {
    const rsvp: PotluckRSVP = {
      _id: '', // will come from db
      userId: '', // will come from request header
      rsvp: this.rsvpForm.value["rsvp"],
      recipe: this.rsvpForm.value["recipe"],
    };
    this.potluckRsvpService.updateRsvp(rsvp, this.potluckId);
  }

  ngOnInit(): void {
    this.rsvpForm = new FormRecord({});
    this.rsvpForm.addControl("rsvp", new FormControl("", Validators.required));
    this.rsvpForm.addControl(
      "recipe",
      new FormControl("", Validators.required)
    );
    this.rsvpForm.valueChanges.subscribe((value) => {
      if (value["rsvp"] == "no") {
        this.recipeText = value["recipe"];
        this.rsvpForm.removeControl("recipe", { emitEvent: false });
      } else {
        this.rsvpForm.addControl(
          "recipe",
          new FormControl(this.recipeText, Validators.required),
          { emitEvent: false }
        );
      }
    });
  }
}
