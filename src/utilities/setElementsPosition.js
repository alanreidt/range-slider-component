import { call } from "./call";
import { setElementPosition } from "./setElementPosition";


export function setElementsPosition(elements, positions, property) {
  elements.forEach(call(setElementPosition, positions, property));
}
