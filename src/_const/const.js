export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
export const phoneRegex = /^[6-9]\d{9}$/;
export const flightNoRegex = /^[0-9]{3,6}$/;

export const listCount = 10;

export const indianAirlines = [
  { label: "Air India", value: 0, icao: "AIC", key: "airindia" },
  { label: "Air India Express", value: 1, icao: "AXB", key: "AIR INDIA EXPRESS" },
  { label: "Alliance Air", value: 2, icao: "UTY", key: "ALLIANCE AIR" },
  { label: "AirAsia India", value: 3, icao: "IAD", key: "AIR ASIA INDIA" },
  { label: "GoAir", value: 4, icao: "GOW", key: "GOAIR" },
  { label: "IndiGo", value: 5, icao: "IGO", key: "INDIGO" },
  { label: "SpiceJet", value: 6, icao: "SEJ", key: "SPICEJET" },
  { label: "TruJet", value: 7, icao: "TRJ", key: "TRUJET" },
  { label: "Vistara", value: 8, icao: "VTI", key: "VISTARA" },
];


export const _role = [
  { label: "Admin", key: "admin", value: 0 },
  { label: "Manager", key: "manager", value: 1 },
  { label: "Pilot", key: "pilot", value: 2 },
  // { name: "Ext. Pilot", key: "externalPilot" },
];

export const checkboxes = [
  {
    name: "east",
    key: "east",
    label: "East",
  },
  {
    name: "west",
    key: "west",
    label: "West",
  },
  {
    name: "north",
    key: "north",
    label: "North",
  },
  {
    name: "south",
    key: "south",
    label: "South",
  },
];
export const posts = [
  {
    label: "Pilot",
    key: "p1",
    value: 0,
  },
  {
    label: "Co-Pilot",
    key: "p2",
    value: 1,
  },
];
export const designations = [
  {
    label: "Executive Commander",
    value: 0,
    key: "executiveCommander",
  },
  {
    label: "Commander",
    key: "commander",
    value: 1,
  },
  {
    label: "First Officer",
    key: "firstOfficer",
    value: 2,
  },
];

export const committeeMembers = [
  {
    name: "Anup Jain",
    contact: "9830173500",
    email: "anupjain320@gmail.com",
    region: "east",
    central: { designation: "Central President" },
    regional: { designation: "Regional President" },  
  },
  {
    name: "Shyam Narayan",
    contact: "9818857321",
    email: "shyamnarayan29jan@gmail.com",
    region: "north",
    central: { designation: "Vice President" },
    regional: { designation: "Regional Secretary" },
  },
  {
    name: "T.Praveen Keerthi",
    contact: "9884077088",
    email: "praveenpilot@gmail.com",
    region: "south",
    central: { designation: "General Secretary" },
    regional: { designation: "Regional Secretary" },
  },
  {
    name: "Kushal Patil",
    contact: "9869651119",
    email: "kushal173@yahoo.com",
    region: "west",
    central: { designation: "Asst. General Secretary" },
    regional: { designation: "Regional Secretary" },
  },
  {
    name: "Ravi Shiv Shankar",
    contact: "9350010573",
    email: "captainravi@hotmail.com",
    region: "north",
    central: { designation: "Central Treasurer" },
    regional: { designation: "Regional President" },
  },
  {
    name: "Arun Balachandran",
    contact: "9837300320",
    email: "arunbalachandran21@gmail.com",
    region: "west",
    central: { designation: "Committee Member" },
    regional: { designation: "Regional President" },
  },
  {
    name: "Ina Roy Chowdhury",
    contact: "9831162222",
    email: "inarc@rediffmail.com",
    region: "east",
    central: { designation: "Committee Member" },
    regional: { designation: "Regional Secretary" },
  },
  {
    name: "Kiran Savula",
    contact: "9966608686",
    email: "kiransavula@gmail.com",
    region: "south",
    central: { designation: "Committee Member" },
    regional: { designation: "Regional Treasurer" },
  },
  {
    name: "Raman Kr Sharma",
    contact: "9903476320",
    email: "ramansharmabh32@yahoo.com",
    region: "east",
    central: { designation: "Committee Member" },
    regional: { designation: "Asst. Regional Secretary" },
  },
];

export const urlMap = {
  letters: "Letters",
  letter: "Letters",
  circulars: "Circulars",
  circular: "Circulars",
  "flight-safety": "Flight Safety",
  flighsafety: "Flight Safety",
};

// export const 