import assert from "assert";

import { template } from "../testUtilities";

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
