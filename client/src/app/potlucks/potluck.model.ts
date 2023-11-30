export interface Potluck {
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
