export function makeTestClass(
  subject,
  testDescription = template`${"...rest"} is equal to ${"expectation"}`,
) {
  class TestClass {
    constructor(testDescription) {
      this.subject = subject;

      if (testDescription) {
        this.testDescription = testDescription;
      }
    }

    test(funcOptions, expectations) {
      expectations.forEach((expectation, index) => {
        const funcOption = funcOptions[index];

        it(this.testDescription(funcOption, expectation), () => {
          assert.deepEqual(this.subject(...funcOption), expectation);
        });
      });
    }
  }

  TestClass.prototype.testDescription = testDescription;

  return TestClass;
}

export function testClass({ Class, methodName, methodGetterName } = {}) {
  return function({ constructorArgs, methodArgsList, expectations } = {}) {
    let constructorArgsRecord = "";

    for (const constructorArgsKey in constructorArgs) {
      const constructorArgsValue = constructorArgs[constructorArgsKey];

      constructorArgsRecord += `${constructorArgsKey} = ${constructorArgsValue}, `;
    }

    expectations.forEach((expectation, index) => {
      const subject = new Class(constructorArgs);
      const methodArgs = methodArgsList && methodArgsList[index];
      let methodArgsRecord = "";

      if (methodName && methodArgs) {
        for (const methodArgsKey in methodArgs) {
          const methodArgsValue = methodArgs[methodArgsKey];

          methodArgsRecord += `${methodArgsKey} = ${methodArgsValue}, `;
        }

        subject[methodName](methodArgs);
      }

      if (methodName && !methodArgs) {
        methodArgsRecord = constructorArgsRecord;

        subject[methodName]();
      }

      const subjectOutput = subject[methodGetterName]();
      methodArgsRecord = methodArgsRecord || "default values";

      context(`if ${methodArgsRecord} were passed`, function() {
        for (const expectationKey in expectation) {
          const expectationValue = expectation[expectationKey];
          const subjectOutputValue = subjectOutput[expectationKey];

          it(`than ${expectationKey} shall be equal to ${expectationValue}`, function() {
            assert.deepEqual(subjectOutputValue, expectationValue);
          });
        }
      });
    });
  };
}

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
 * The template function is a modification of
 * a template function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */

export function template(strings, ...keys) {
  return function(values, expectation) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];

    keys.forEach((key, i) => {
      const value = `${
        Number.isInteger(key)
          ? values[key]
          : key === "...rest"
          ? values.slice(i)
          : key === "expectation"
          ? expectation
          : dict[key]
      }`;

      result.push(value, strings[i + 1]);
    });

    return result.join("");
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
