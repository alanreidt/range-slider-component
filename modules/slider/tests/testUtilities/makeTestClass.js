import { assert } from "chai";

import { testDescriptionTemplate } from "./testDescriptionTemplate";

/**
 * Returns a class for a test.
 *
 * @param {Object} subject A subject of the test.
 * @param {testDescriptionTemplate} commonDescriptionTemplate A test description template,
 *  composed via testDescriptionTemplate testUtilities function.
 */
export function makeTestClass(
  subject,
  commonDescriptionTemplate = testDescriptionTemplate`${"...rest"} is equal to ${"expectation"}`,
) {
  return class {
    /**
     * @param {testDescriptionTemplate} localDescriptionTemplate A test description template,
     *  composed via testDescriptionTemplate testUtilities function.
     *  Will replace commonDescriptionTemplate, if it's passed.
     */
    constructor(localDescriptionTemplate) {
      this.subject = subject;
      this.composeDescription =
        localDescriptionTemplate || commonDescriptionTemplate;
    }

    /**
     * Run the test.
     *
     * @param {any} funcArgsList A testing function arguments array
     * @param {any} expectations The test expectations
     */
    run(funcArgsList, expectations) {
      expectations.forEach((expectation, index) => {
        const funcArgs = funcArgsList[index];

        it(this.composeDescription(funcArgs, expectation), () => {
          assert.deepEqual(this.subject(...funcArgs), expectation);
        });
      });
    }
  };
}
