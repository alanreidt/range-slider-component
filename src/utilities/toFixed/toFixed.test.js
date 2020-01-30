import { toFixed } from "./toFixed";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("toFixed", () => {
  const describeTest = template`${0} with ${1} fixed digits is ${"expectation"}`;
  const TestClass = makeTestClass(toFixed, describeTest);

  describe("shall fix number of digits after the decimal point", () => {
    describe("fix to 0 digits", () => {
      const funcOptions = [[0.1619048], [0.3333333], [0.957], [0.5], [-0.5]];
      const expectations = ["0", "0", "1", "1", "-1"];
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });
    describe("fix to 1 digit", () => {
      const funcOptions = [
        [0.1619048, 1],
        [0.3333333, 1],
        [0.957, 1],
      ];
      const expectations = ["0.2", "0.3", "1.0"];
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });
    describe("fix to 5 digits", () => {
      const funcOptions = [
        [0.1619048, 5],
        [0.3333333, 5],
        [0.957, 5],
      ];
      const expectations = ["0.16190", "0.33333", "0.95700"];
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });
  });

  describe("shall not add 0s after the decimal point to an integer", () => {
    const funcOptions = [
      [0, 3],
      [100, 3],
      [-100, 3],
    ];
    const expectations = ["0", "100", "-100"];
    const test = new TestClass();
    test.run(funcOptions, expectations);
  });

  describe("shall return Infinity and NaN as is (only turning them into a string)", () => {
    const funcOptions = [
      [Infinity, 2],
      [NaN, 2],
    ];
    const expectations = ["Infinity", "NaN"];
    const test = new TestClass();
    test.run(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if number parameter is incorrect", () => {
      const funcOptions = [
        [undefined, 4],
        [null, 4],
        ["text", 4],
        ["123text", 4],
      ];
      const expectations = new Array(funcOptions.length).fill("NaN");
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });

    describe("returns NaN, if fractionDigits parameter is incorrect", () => {
      const funcOptions = [
        [10.9765, null],
        [10.9765, Infinity],
        [10.9765, NaN],
        [10.9765, "text"],
        [10.9765, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill("NaN");
      const test = new TestClass();
      test.run(funcOptions, expectations);
    });
  });
});
