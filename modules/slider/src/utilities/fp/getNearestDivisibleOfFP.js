import { getNearestDivisibleOf } from "../getNearestDivisibleOf/getNearestDivisibleOf";

const curryRight = require("lodash/curryRight");

export const getNearestDivisibleOfFP = curryRight(getNearestDivisibleOf);
