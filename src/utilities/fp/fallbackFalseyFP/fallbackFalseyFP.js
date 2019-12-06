import { fallbackFalsey } from "../../fallbackFalsey/fallbackFalsey";

const curryRight = require("lodash/curryRight");

export const fallbackFalseyFP = curryRight(fallbackFalsey);
