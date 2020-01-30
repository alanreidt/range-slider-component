import { findClosestTo } from "./findClosestTo";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("findClosestTo", () => {
  const describeTest = template`closest number to ${0} from ${"...rest"} is ${"expectation"}`;
  const TestClass = makeTestClass(findClosestTo, describeTest);

  describe("shall return closest number to the number", () => {
    const funcOptions = [
      [100, 50, 90],
      [-100, -50, -90],
      [0, -50, 90],
      [250, -100, 100],
      [250, -100, 100, 250],
      [100, 50, 90, 105],
    ];
    const expectations = [90, -90, -50, 100, 250, 105];
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  describe("shall return last closest number to the number, if controversial", () => {
    const funcOptions = [
      [100, 99, 105, 101, 5],
      [100, 101, 105, 99, 5],
    ];
    const expectations = [101, 99];
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  describe("shall filter incorrect arguments", () => {
    const funcOptions = [
      [100, null, 105, undefined, 5],
      [0, null, 105, Infinity, 5],
    ];
    const expectations = [105, 5];
    const test = new TestClass();

    test.run(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN if number parameter is incorrect", () => {
      const funcOptions = [
        [undefined, -100, 100],
        [null, -100, 100],
        [Infinity, -100, 100],
        [NaN, -100, 100],
        ["text", -100, 100],
        ["123text", -100, 100],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();

      test.run(funcOptions, expectations);
    });

    describe("returns NaN if variants parameter is incorrect", () => {
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

      test.run(funcOptions, expectations);
    });
  });
});
