import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormRecord, FormControl, Validators } from "@angular/forms";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { PotluckRSVPService } from "../potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";

@Component({
  selector: "app-potluck-rsvp-edit-with-plus-one",
  templateUrl: "potluck-rsvp-edit-with-plus-one.dialog.html"
})
export class PotluckRSVPEditDialogWithPlusOne implements OnInit {
  public rsvpForm: FormRecord;
  public rsvpsToSubmit: PotluckRSVP[];
  public additionalUser: User;

  private recipeText: string = "";
  private additionalRSVP: boolean;
  private additionalUserName: string = "";
  private additionalRecipeText: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public potluckId: string,
    private potluckRsvpService: PotluckRSVPService
  ) { }

  onSubmit() {
    this.rsvpsToSubmit =
      [{
        _id: '', // will come from db
        userId: '', // will come from request header
        rsvp: this.rsvpForm.value["rsvp"],
        recipe: this.rsvpForm.value["recipe"],
      }];
    if (this.rsvpForm.value["additional-rsvp"] == "yes") {
      this.rsvpsToSubmit.push(
        {
          _id: '', // will come from db
          userId: this.rsvpForm.value["additional-user"],
          rsvp: "yes",
          recipe: this.rsvpForm.value["additional-recipe"]
        }
      )
    }

    this.potluckRsvpService.updateRsvps(this.rsvpsToSubmit, this.potluckId);
  }

  ngOnInit(): void {
    this.rsvpForm = new FormRecord({});
    this.rsvpForm.addControl(
      "rsvp",
      new FormControl("", Validators.required)
    );

    this.rsvpForm.valueChanges.subscribe((value) => {
      //check for additional user and remove controls as necessary here, not in the next if statement
      if (value["rsvp"] == "no") {
        this.recipeText = value["recipe"];
        this.additionalRSVP = value["additional-rsvp"]
        this.additionalUserName = value["additional-user"];
        this.additionalRecipeText = value["additional-recipe"];

        this.rsvpForm.removeControl("recipe", { emitEvent: false });
        this.rsvpForm.removeControl("additional-rsvp", { emitEvent: false });
        this.rsvpForm.removeControl("additional-user", { emitEvent: false });
        this.rsvpForm.removeControl("additional-recipe", { emitEvent: false });
      } else {
        this.rsvpForm.addControl(
          "recipe",
          new FormControl(this.recipeText, Validators.required),
          { emitEvent: false }
        );
        // this.rsvpForm.addControl(
        //   "additional-rsvp",
        //   new FormControl(this.additionalRSVP, Validators.required),
        //   { emitEvent: false }
        // );
        // if (value["additional-rsvp"] == "no") {
        //   this.additionalUserName = value["additional-user"];
        //   this.additionalRecipeText = value["additional-recipe"];
        //   this.rsvpForm.removeControl("additional-user", { emitEvent: false });
        //   this.rsvpForm.removeControl("additional-recipe", { emitEvent: false });
        // } else {
        //   this.rsvpForm.addControl(
        //     "additional-user",
        //     new FormControl(this.additionalUserName, Validators.required),
        //     { emitEvent: false }
        //   );         
        //   this.rsvpForm.addControl(
        //     "additional-recipe",
        //     new FormControl(this.additionalRecipeText),
        //     { emitEvent: false }
        //   );
        // }
      }
    });
  }
}
