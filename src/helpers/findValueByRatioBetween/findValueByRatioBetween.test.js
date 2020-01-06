import { findValueByRatioBetween } from "./findValueByRatioBetween";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findValueByRatioBetween", () => {
  const describeTest = template`value by ${0} between ${1} and ${2} equals to ${"expectation"}`;
  const TestClass = makeTestClass(findValueByRatioBetween, describeTest);

  describe("shall return value", () => {
    const funcOptions = [
      [0.2, 0, 500],
      [0, 0, 500],
      [1, 0, 500],
      [0.957, 0, 1000],
      [0.1, 200, 700],
      [0.5, -500, 500],
      [0.3, -500, 500],
      [0.9, -500, 0],
      [0.5, -500, -200],
    ];
    const expectations = [100, 0, 500, 957, 250, 0, -200, -50, -350];
    const test = new TestClass();

    test.test(funcOptions, expectations);
  });

  context("shall handle exceptions", () => {
    describe("handle exceeded ratio (0 > ratio > 1)", () => {
      const funcOptions = [
        [1.01, 200, 700],
        [2, 200, 700],
        [-0.01, 200, 700],
        [-1, 200, 700],
      ];
      const expectations = [705, 1200, 195, -300];
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    describe("handle Infinity", () => {
      const funcOptions = [
        [Infinity, -500, 500],
        [0.5, -500, Infinity],
      ];
      const expectations = [Infinity, Infinity];
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if ratio parameter is incorrect", () => {
      const funcOptions = [
        [undefined, -500, 500],
        [null, -500, 500],
        [NaN, -500, 500],
        ["text", -500, 500],
        ["123text", -500, 500],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if start parameter is incorrect", () => {
      const funcOptions = [
        [0.5, undefined, 500],
        [0.5, null, 500],
        [0.5, Infinity, 500],
        [0.5, NaN, 500],
        [0.5, "text", 500],
        [0.5, "123text", 500],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if end parameter is incorrect", () => {
      const funcOptions = [
        [0.5, -500, undefined],
        [0.5, -500, null],
        [0.5, -500, NaN],
        [0.5, -500, "text"],
        [0.5, -500, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });
  });
});
