import { template } from "./template";

export function test(
  func,
  describeTest = template`${"...rest"} is equal to ${"expectation"}`,
) {
  return function(funcOptions, expectations) {
    expectations.forEach((expectation, index) => {
      const funcOption = funcOptions[index];

      it(describeTest(funcOption, expectation), function() {
        assert.deepEqual(func(...funcOption), expectation);
      });
    });
  };
}

/**
 * The simulateMouseEvent function is a modification of
 * a simulateClick function, borrowed from
 * https://gomakethings.com/how-to-simulate-a-click-event-with-javascript/
 */

/**
 * Simulate a click event.
 * @public
 * @param {Element} element  the element to simulate a click on
 */
export function simulateMouseEvent(eventType, element, options) {
  options = {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  };

  // Create our event (with options)
  const event = new MouseEvent(eventType, options);

  // If cancelled, don't dispatch our event
  const canceled = !element.dispatchEvent(event);
}
