export function setElementPosition(element, position, property = "left") {
  element.style[property] = position;
  return element;
}
