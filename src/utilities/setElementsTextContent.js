import { call } from "./call/call";
import { setElementTextContent } from "./setElementTextContent/setElementTextContent";

export function setElementsTextContent(elements, values) {
  elements.forEach(call(setElementTextContent, values));
}
