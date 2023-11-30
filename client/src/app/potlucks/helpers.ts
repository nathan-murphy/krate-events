import { Potluck } from "./potluck.model";

export const samplePotlucks: Potluck[] = [
  {
    dateAndTime: {
      startDate: "9/1/2023",
      startTime: "5:00 pm",
    },
    address: "Krate House",
    details: {
      theme: "Foods from a movie",
      description: "Foods featured in movies.",
    },
  },
  {
    dateAndTime: {
      startDate: "10/4/2023",
      startTime: "5:00 pm",
    },
    address: "Krate House",
    details: {
      theme: "Fancy Foods",
      description: "A fancy food potluck.",
    },
  },
  {
    dateAndTime: {
      startDate: "11/9/2023",
      startTime: "5:00 pm",
    },
    address: "Krate House",
    details: {
      theme: "Presidents day",
      description:
        "Pick a president and figure out what kind of food they like!",
    },
  },
  {
    dateAndTime: {
      startDate: "12/17/2023",
      startTime: "5:00 pm",
    },
    address: "Krate House",
    details: {
      theme: "Christmas foods",
      description: "Food you eat at Christmas",
    },
  },
  {
    dateAndTime: {
      startDate: "1/8/2023",
      startTime: "5:00 pm",
    },
    address: "Krate House",
    details: {
      theme: "New Year, New Recipe",
      description: "Try making a new recipe!",
    },
  },
];
