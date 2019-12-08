import { call } from "./call/call";
import { setElementPosition } from "./setElementPosition/setElementPosition";


export function setElementsPosition(elements, positions, property) {
  elements.forEach(call(setElementPosition, positions, property));
}
