import { findClosestFactor } from "./findClosestFactor";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findClosestFactor", () => {
  const describeTest = template`nearest divisor of division of ${0} by ${1} is ${"expectation"}`;
  const TestClass = makeTestClass(findClosestFactor, describeTest);

  describe("shall return nearest divisor", () => {
    const funcOptions = [
      [900, 250],
      [120, 25],
      [100, 15],
      [500, 375],
      [500, -375],
      [100, 50],
      [100, 100],
      [25, 120],
      [500, 0],
    ];
    const expectations = [225, 24, 20, 500, 1, 50, 100, 25, 1];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall return NaN, when operation can't be performed", () => {
    const funcOptions = [
      [0, 375],
      [0, 0],
      [-120, 25],
      [-500, -375],
    ];
    const expectations = new Array(funcOptions.length).fill(NaN);
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if dividend parameter is incorrect", () => {
      const funcOptions = [
        [undefined, 25],
        [null, 25],
        [Infinity, 25],
        [NaN, 25],
        ["text", 25],
        ["123text", 25],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if divisor parameter is incorrect", () => {
      const funcOptions = [
        [50, undefined],
        [50, null],
        [50, Infinity],
        [50, NaN],
        [50, "text"],
        [50, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });
});
