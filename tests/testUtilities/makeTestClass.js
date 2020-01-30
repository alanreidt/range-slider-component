import { assert } from "chai";

import { testDescriptionTemplate } from "./testDescriptionTemplate";

export function makeTestClass(
  subject,
  commonDescriptionTemplate = testDescriptionTemplate`${"...rest"} is equal to ${"expectation"}`,
) {
  return class {
    constructor(localDescriptionTemplate) {
      this.subject = subject;
      this.composeDescription =
        localDescriptionTemplate || commonDescriptionTemplate;
    }

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
