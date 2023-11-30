import { User } from "../users/user.model";
import { PotluckRSVP } from "../potluck-rsvp/potluck-rsvp.model";

export interface Potluck {
  _id?: number;
  dateAndTime: {
    startDate: string;
    startTime: string;
  };
  address: string;
  details: {
    theme: string;
    description: string;
  };
  hosts?: [User];
  rsvps?: [PotluckRSVP];
}
