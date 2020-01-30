/**
 * The function is a modification of
 * a template function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function testDescriptionTemplate(strings, ...keys) {
  return (values, expectation) => {
    const result = [strings[0]];

    keys.forEach((key, i) => {
      let value = null;

      switch (key) {
        case "...rest":
          value = values.slice(i);
          break;
        case "expectation":
          value = expectation;
          break;
        default:
          value = values[key];
      }

      result.push(String(value), strings[i + 1]);
    });

    return result.join("");
  };
}
