import { User } from "../users/user.model";
import { PotluckRSVP } from "../potluck-rsvp/potluck-rsvp.model";

export interface Potluck {
  _id?: string;
  dateAndTime: {
    startDate: string;
    startTime: string;
  };
  address: string;
  details: {
    theme: string;
    description: string;
  };
  createdBy?: string;
  createdByAsUser?: User;
  hosts: [string];
  hostsAsUsers?: Array<User>;
  invited: [string];
  rsvps: [PotluckRSVP];
}
