import { User } from "../users/user.model";
import { Potluck } from "../potlucks/potluck.model";

export interface PotluckRSVP {
  _id?: number;
  user: User;
  potluck: Potluck;
  rsvp: string;
  recipe: string;
}
