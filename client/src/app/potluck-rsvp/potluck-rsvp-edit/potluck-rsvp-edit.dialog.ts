import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormRecord, FormControl, Validators } from "@angular/forms";
import { PotluckRSVP } from "../potluck-rsvp.model";
import { PotluckRSVPService } from "../potluck-rsvp.service";
import { UserService } from "src/app/users/user.service";
import { User } from "src/app/users/user.model";

@Component({
  selector: "app-potluck-rsvp-edit",
  templateUrl: "potluck-rsvp-edit.dialog.html",
  styleUrls: ["potluck-rsvp-edit.dialog.css"],
})
export class PotluckRSVPEditDialog implements OnInit {
  public rsvpForm: FormRecord;
  private recipeText: string = "";
  private additionalRecipeText: string = "";
  private user: User;
  additionalUser: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public potluckId: string,
    private potluckRsvpService: PotluckRSVPService,
    private userService: UserService
  ) { }

  onSubmit() {
    const rsvp: PotluckRSVP = {
      _id: '', // will come from db
      userId: '', // will come from request header
      rsvp: this.rsvpForm.value["rsvp"],
      recipe: this.rsvpForm.value["recipe"],
    };
    this.potluckRsvpService.updateRsvp(rsvp, this.potluckId);
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user
      const userCanRSVPFor: string = this.user.permissions.canRSVPFor;
      if (userCanRSVPFor != this.user._id)
        this.userService.getUser(userCanRSVPFor).subscribe(user => this.additionalUser = user)
    });

    this.rsvpForm = new FormRecord({});
    this.rsvpForm.addControl(
      "rsvp",
      new FormControl("", Validators.required)
    );
    this.rsvpForm.addControl(
      "recipe",
      new FormControl("", Validators.required)
    );
    this.rsvpForm.addControl(
      "agree-to-rsvp",
      new FormControl("",)
    );
    this.rsvpForm.addControl(
      "rsvp-additional",
      new FormControl("", Validators.required)
    );
    this.rsvpForm.addControl(
      "recipe-additional",
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
      if (value["rsvp-additional"] == "no") {
        this.additionalRecipeText = value["recipe-additional"];
        this.rsvpForm.removeControl("recipe-additional", { emitEvent: false });
      } else {
        this.rsvpForm.addControl(
          "recipe-additional",
          new FormControl(this.additionalRecipeText, Validators.required),
          { emitEvent: false }
        );
      }
    });
  }
}
