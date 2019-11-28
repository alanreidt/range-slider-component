import { call } from "./call";
import { setElementTextContent } from "./setElementTextContent";


export function setElementsTextContent(elements, values) {
  elements.forEach( call(setElementTextContent, values) );
}
