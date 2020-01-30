import { findClosestDivisible } from "./findClosestDivisible";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findClosestDivisible", () => {
  const describeTest = template`closest divisible number for division of ${0} by ${1} is ${"expectation"}`;
  const TestClass = makeTestClass(findClosestDivisible, describeTest);

  describe("shall return closest divisible number", () => {
    const funcOptions = [
      [220, 100],
      [250, 100],
      [280, 100],
      [30, 100],
      [60, 100],
      [-220, 100],
      [-250, 100],
      [-280, 100],
    ];
    const expectations = [200, 300, 300, 0, 100, -200, -200, -300];
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  describe("shall return NaN, if operation can't be performed", () => {
    const funcOptions = [[200, 0], [], [200]];
    const expectations = new Array(funcOptions.length).fill(NaN);
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  describe("shall correct negative divisor, removing sign", () => {
    const funcOptions = [
      [220, -100],
      [250, -100],
      [280, -100],
      [0, -100],
      [-120, -100],
    ];
    const expectations = [200, 300, 300, 0, -100];
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  describe("shall catch garbage input", () => {
    context("returns NaN if dividend parameter is incorrect", () => {
      const funcOptions = [
        [undefined, 60],
        [null, 60],
        [Infinity, 60],
        [NaN, 60],
        ["text", 60],
        ["123text", 60],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.run(funcOptions, expectations);
    });

    context("returns NaN if divisor parameter is incorrect", () => {
      const funcOptions = [
        [100, undefined],
        [100, null],
        [100, Infinity],
        [100, NaN],
        [100, "text"],
        [100, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.run(funcOptions, expectations);
    });
  });
});
