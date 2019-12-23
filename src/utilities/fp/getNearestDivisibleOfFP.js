import { findClosestDivisible } from "../findClosestDivisible/findClosestDivisible";

const curryRight = require("lodash/curryRight");

export const getNearestDivisibleOfFP = curryRight(findClosestDivisible);
