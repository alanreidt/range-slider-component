/**
 * The function is a modification of
 * a template function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function testDescriptionTemplate(strings, ...keys) {
  return function(values, expectation) {
    const result = [strings[0]];

    keys.forEach((key, i) => {
      const value = `${
        Number.isInteger(key)
          ? values[key]
          : key === "...rest"
          ? values.slice(i)
          : expectation
      }`;

      result.push(value, strings[i + 1]);
    });

    return result.join("");
  };
}
