import { findRatio } from "./findRatio";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findRatio", () => {
  const describeTest = template`ratio of ${0} to ${1} is ${"expectation"}`;
  const TestClass = makeTestClass(findRatio, describeTest);

  describe("shall return ratio", () => {
    const funcOptions = [
      [100, 500],
      [0, 500],
      [500, 500],
      [957, 1000],
      [0, 300],
      [250, 500, 200],
      [0, 1000, -500],
      [-200, 1000, -500],
      [-50, 500, -500],
      [-350, 300, -500],
    ];
    const expectations = [0.2, 0, 1, 0.957, 0, 0.1, 0.5, 0.3, 0.9, 0.5];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall handle exceptions", () => {
    const funcOptions = [
      [100, 500, 200],
      [900, 500, 200],
      [300, 500, -700],
      [0, 500, -700],
      [0, 300],
      [300, 300, 300],
      [Infinity, 1000, -500],
      [300, Infinity, -500],
    ];
    const expectations = [-0.2, 1.4, 2, 1.4, 0, 0, Infinity, 0];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if antecedent parameter is incorrect", () => {
      const funcOptions = [
        [undefined, 1000, -500],
        [null, 1000, -500],
        [NaN, 1000, -500],
        ["text", 1000, -500],
        ["123text", 1000, -500],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if consequent parameter is incorrect", () => {
      const funcOptions = [
        [100, undefined, -500],
        [100, null, -500],
        [100, NaN, -500],
        [100, "text", -500],
        [100, "123text", -500],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if offset parameter is incorrect", () => {
      const funcOptions = [
        [100, 200, null],
        [100, 200, NaN],
        [100, 200, Infinity],
        [100, 200, "text"],
        [100, 200, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });
});
