/**
 * This is the tagged template function.
 * It parses template literal and then converts it into a string,
 * replacing keywords — "...rest", "expectation" or argument index — with arguments,
 * passed to the closure.
 *
 * The function is a modification of
 * a template function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 *
 * @param {any} args testing function arguments
 * @param {any} expectation test expectation
 */
export function testDescriptionTemplate(strings, ...keys) {
  return (args, expectation) => {
    const description = [strings[0]];

    keys.forEach((key, i) => {
      let value = null;

      switch (key) {
        case "...rest":
          value = args.slice(i);
          break;
        case "expectation":
          value = expectation;
          break;
        default:
          value = args[key];
      }

      description.push(String(value), strings[i + 1]);
    });

    return description.join("");
  };
}
