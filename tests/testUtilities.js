export function makeTestClass(subject, testDescription = template`${"...rest"} is equal to ${"expectation"}`) {
  class TestClass {
    constructor(testDescription) {
      this.subject = subject;

      if (testDescription) {
        this.testDescription = testDescription;
      }
    }

    test(funcOptions, expectations) {
      expectations.forEach( (expectation, index) => {
        let funcOption = funcOptions[index];

        it(this.testDescription(funcOption, expectation), () => {
          assert.deepEqual( this.subject(...funcOption), expectation );
        });
      });
    }
  }

  TestClass.prototype.testDescription = testDescription;

  return TestClass;
}

export function testClass({Class, ClassOptions, options, expectations} = {}) {

  expectations.forEach( (expectation, index) => {
    let subject = new Class(ClassOptions);
    let option = options[index];
    let optionsRecord = '';

    for (let optionKey in option) {
      let optionValue = option[optionKey];

      subject[optionKey] = optionValue;
      optionsRecord += `${optionKey} = ${optionValue}, `;
    };

    context(`if ${optionsRecord} were passed`, function() {
      for (let expectationKey in expectation) {
        let expectationValue = expectation[expectationKey];
        let subjectValue = subject[expectationKey];

        it(`than ${expectationKey} shall be equal to ${expectationValue}`, function() {
          assert.deepEqual(subjectValue, expectationValue);
        });
      }
    });
  });

}

export function test(func, describeTest = template`${"...rest"} is equal to ${"expectation"}`) {
  return function(funcOptions, expectations) {

    expectations.forEach( (expectation, index) => {
      let funcOption = funcOptions[index];

      it(describeTest(funcOption, expectation), function() {
        assert.deepEqual( func(...funcOption), expectation );
      });
    });

  }
}


/**
 * The template function is a modification of
 * a template function, borrowed from
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */

export function template(strings, ...keys) {

  return function(values, expectation) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];

    keys.forEach( (key, i) => {
      let value = `${Number.isInteger(key) ? values[key] :
        (key === "...rest") ? values.slice(i) :
        (key === "expectation") ? expectation : dict[key]}`;

      result.push(value, strings[i + 1]);
    });

    return result.join('');
  };

}


/**
 * Simulate a click event.
 * @public
 * @param {Element} elem  the element to simulate a click on
 */
var simulateClick = function (elem) {
	// Create our event (with options)
	var evt = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window
	});
	// If cancelled, don't dispatch our event
	var canceled = !elem.dispatchEvent(evt);
};
