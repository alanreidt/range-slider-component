import { findClosestFactor } from "../findClosestFactor/findClosestFactor";

const curry = require("lodash/curry");

export const getClosestFactorOfFP = curry(findClosestFactor);
