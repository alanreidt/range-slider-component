import { placeValueBetween } from "../placeValueBetween/placeValueBetween";

const curryRight = require("lodash/curryRight");

export const packIntoFP = curryRight(placeValueBetween);
