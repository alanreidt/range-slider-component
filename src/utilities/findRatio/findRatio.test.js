import { findRatio } from "./findRatio";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findRatio", () => {
  const describeTest = template`ration of ${0} to ${1} is ${"expectation"}`;
  const TestClass = makeTestClass(findRatio, describeTest);

  describe("shall return ratio", () => {
    const funcOptions = [
      // [{ ofA, toB, offset }],
      [{ antecedent: 100, consequent: 500 }],
      [{ antecedent: 0, consequent: 500 }],
      [{ antecedent: 500, consequent: 500 }],
      [{ antecedent: 957, consequent: 1000 }],
      [{ antecedent: 250, consequent: 500, offset: 200 }],
      [{ antecedent: 0, consequent: 1000, offset: -500 }],
      [{ antecedent: -200, consequent: 1000, offset: -500 }],
      [{ antecedent: -50, consequent: 500, offset: -500 }],
      [{ antecedent: -350, consequent: 300, offset: -500 }],
      [{ antecedent: 0, consequent: 300 }],
    ];
    const expectations = [0.2, 0, 1, 0.957, 0.1, 0.5, 0.3, 0.9, 0.5];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall handle exceptions", () => {
    const funcOptions = [
      [{ antecedent: 100, consequent: 500, offset: 200 }],
      [{ antecedent: 900, consequent: 500, offset: 200 }],
      [{ antecedent: 300, consequent: 500, offset: -700 }],
      [{ antecedent: 0, consequent: 500, offset: -700 }],
      [{ antecedent: 0, consequent: 300 }],
      [{ antecedent: 300, consequent: 300, offset: 300 }],
      [{ antecedent: Infinity, consequent: 1000, offset: -500 }],
      [{ antecedent: 300, consequent: Infinity, offset: -500 }],
    ];
    const expectations = [-0.2, 1.4, 2, 1.4, 0, 0, Infinity, 0];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if antecedent parameter is incorrect", () => {
      const funcOptions = [
        [{ antecedent: undefined, consequent: 1000, offset: -500 }],
        [{ antecedent: null, consequent: 1000, offset: -500 }],
        [{ antecedent: NaN, consequent: 1000, offset: -500 }],
        [{ antecedent: "text", consequent: 1000, offset: -500 }],
        [{ antecedent: "123text", consequent: 1000, offset: -500 }],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if consequent parameter is incorrect", () => {
      const funcOptions = [
        [{ antecedent: 100, consequent: undefined, offset: -500 }],
        [{ antecedent: 100, consequent: null, offset: -500 }],
        [{ antecedent: 100, consequent: NaN, offset: -500 }],
        [{ antecedent: 100, consequent: "text", offset: -500 }],
        [{ antecedent: 100, consequent: "123text", offset: -500 }],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if offset parameter is incorrect", () => {
      const funcOptions = [
        [{ antecedent: 100, consequent: 200, offset: null }],
        [{ antecedent: 100, consequent: 200, offset: NaN }],
        [{ antecedent: 100, consequent: 200, offset: Infinity }],
        [{ antecedent: 100, consequent: 200, offset: "text" }],
        [{ antecedent: 100, consequent: 200, offset: "123text" }],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });
});
