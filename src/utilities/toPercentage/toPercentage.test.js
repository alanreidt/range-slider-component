import { toPercentage } from "./toPercentage";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("toPercentage", () => {
  const describeTest = template`converts ${0} to ${"expectation"}`;
  const TestClass = makeTestClass(toPercentage, describeTest);

  describe("shall convert number to percentages", () => {
    const funcOptions = [[0], [2], [0.2], [0.75], [-2.5]];
    const expectations = ["0%", "200%", "20%", "75%", "-250%"];
    const test = new TestClass();
    test.run(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if number parameter is incorrect", () => {
      const funcOptions = [
        [undefined],
        [null],
        [Infinity],
        [NaN],
        ["text"],
        ["123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });
  });
});
