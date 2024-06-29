import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormRecord, FormControl, Validators } from "@angular/forms";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { PotluckRSVPService } from "../potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";

@Component({
  selector: "app-potluck-rsvp-edit-with-delegate",
  templateUrl: "potluck-rsvp-edit-with-delegate.dialog.html"
})
export class PotluckRSVPEditDialogWithDelegate implements OnInit {
  public rsvpForm: FormRecord;
  public rsvpsToSubmit: PotluckRSVP[];
  public additionalUser: User;

  private recipeText: string = "";
  private additionalUserRsvp: boolean;
  private additionalRecipeText: string = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public potluckId: string,
    private potluckRsvpService: PotluckRSVPService,
    private userService: UserService
  ) { }

  onSubmit() {
    this.rsvpsToSubmit =
      [{
        _id: '', // will come from db
        userId: '', // will come from request header
        rsvp: this.rsvpForm.value["rsvp"],
        recipe: this.rsvpForm.value["recipe"],
      }];

    if (this.rsvpForm.value["agree-to-rsvp"] == "yes") {
      this.rsvpsToSubmit.push(
        {
          _id: '', // will come from db
          userId: this.additionalUser._id,
          rsvp: this.rsvpForm.value["additional-rsvp"],
          recipe: this.rsvpForm.value["additional-recipe"]
        }
      )
    }

    this.potluckRsvpService.updateRsvps(this.rsvpsToSubmit, this.potluckId);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.userService.getUser(user.permissions.canRSVPFor).subscribe(user => this.additionalUser = user)
    });

    this.rsvpForm = new FormRecord({});
    this.rsvpForm.addControl(
      "rsvp",
      new FormControl("", Validators.required)
    );
    this.rsvpForm.addControl(
      "agree-to-rsvp",
      new FormControl(null, Validators.required)
    );

    this.rsvpForm.valueChanges.subscribe((value) => {
      if (value["rsvp"] == "no") {
        this.recipeText = value["recipe"];
        this.rsvpForm.removeControl("recipe", { emitEvent: false });
      } else {
        this.rsvpForm.addControl("recipe", new FormControl(this.recipeText, Validators.required), { emitEvent: false });
      }

      if (value["agree-to-rsvp"] == "no") {
        this.additionalUserRsvp = value["additional-rsvp"]
        this.additionalRecipeText = value["additional-recipe"];
        this.rsvpForm.removeControl("additional-rsvp", { emitEvent: false });
        this.rsvpForm.removeControl("additional-recipe", { emitEvent: false });
      } else {
        // agreeing to RSVP for delegate. add the rsvp question to the form.
        this.rsvpForm.addControl("additional-rsvp", new FormControl(this.additionalUserRsvp, Validators.required), { emitEvent: false });
        if (value["additional-rsvp"] == "no") {
          this.additionalRecipeText = value["additional-recipe"];
          this.rsvpForm.removeControl("additional-recipe", { emitEvent: false });
        } else {
          this.rsvpForm.addControl("additional-recipe", new FormControl(this.additionalRecipeText), { emitEvent: false });
        }
      }
    });
  }
}
