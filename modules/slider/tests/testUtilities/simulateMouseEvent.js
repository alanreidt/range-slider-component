/**
 * Simulate a mouse event.
 *
 * The function is a modification of
 * a simulateClick function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 *
 * @param {HTMLElement} element An element to simulate a mouse event on
 */
export function simulateMouseEvent(eventType, element, options) {
  const event = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });

  element.dispatchEvent(event);
}
