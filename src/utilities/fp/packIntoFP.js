import { packInto } from "../packInto/packInto";

const curryRight = require("lodash/curryRight");

export const packIntoFP = curryRight(packInto);
