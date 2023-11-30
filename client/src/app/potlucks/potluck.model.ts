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
}
