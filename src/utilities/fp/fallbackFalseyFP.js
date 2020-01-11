import { either } from "../either/either";

const curryRight = require("lodash/curryRight");

export const fallbackFalseyFP = curryRight(either);
