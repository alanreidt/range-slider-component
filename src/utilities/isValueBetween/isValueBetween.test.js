import { isValueBetween } from "./isValueBetween";
import { test, template } from "../../../tests/testUtilities";


export function testIsValueBetween() {
  describe("isValueBetween", function () {
    let describeTest = template`${0} between ${1} and ${2} is equal to ${"expectation"}`;
    let testCurrent = test(isValueBetween, describeTest);

    describe("shall return true, if value is between start and end", function () {
      let funcOptions = [
        [50, 0, 100],
        [-50, -100, 0],
        [-250, -300, -100],
        [0, -300, 300],
        [0, -300, Infinity],
        [0, -Infinity, 300],
        [1000000000, -Infinity, Infinity],
      ];
      let expectations = new Array(funcOptions.length).fill(true);
      testCurrent(funcOptions, expectations);
    });


    describe("shall return false, if value is not between start and end", function () {
      let funcOptions = [
        [150, 0, 100],
        [-150, -100, 0],
        [-350, -300, -100],
        [-500, -300, 300],
        [-500, -300, Infinity],
        [500, -Infinity, 300],
      ];
      let expectations = new Array(funcOptions.length).fill(false);
      testCurrent(funcOptions, expectations);
    });


    describe("shall handle input, when start is end and vice versa", function () {
      let funcOptions = [
        [50, 100, 0],
        [-50, 0, -100],
        [-250, -100, -300],
        [0, 300, -300],
        [0, Infinity, -300],
        [0, 300, -Infinity],
        [1000000000, Infinity, -Infinity],
      ];
      let expectations = new Array(funcOptions.length).fill(true);
      testCurrent(funcOptions, expectations);
    });


    describe("shall not include extremums", function () {
      let funcOptions = [
        [100, 0, 100],
        [0, 0, 100],
        [300, -300, 300],
        [-300, -300, 300],
        [Infinity, -300, Infinity],
        [-Infinity, -Infinity, 300],
        [Infinity, -Infinity, Infinity],
        [-Infinity, -Infinity, Infinity],
      ];
      let expectations = new Array(funcOptions.length).fill(false);
      testCurrent(funcOptions, expectations);
    });


    describe("shall return false, if there is no value in between", function () {
      let funcOptions = [
        [100, 100, 100],
        [100, 100, 101],
        [101, 100, 101],
        [-300, -300, -300],
        [-300, -301, -300],
        [-301, -301, -300],
      ];
      let expectations = new Array(funcOptions.length).fill(false);
      testCurrent(funcOptions, expectations);
    });


    context("shall catch garbage input", function () {
      describe("returns false, if value is incorrect", function () {
        let funcOptions = [
          [undefined, -100, 100],
          [null, -100, 100],
          [Infinity, -100, 100],
          [NaN, -100, 100],
          ["text", -100, 100],
          ["123text", -100, 100],
        ];
        let expectations = new Array(funcOptions.length).fill(false);
        testCurrent(funcOptions, expectations);
      });

      describe("returns false, if start is incorrect", function () {
        let funcOptions = [
          [50, undefined, 100],
          [50, null, 100],
          [50, NaN, 100],
          [50, "text", 100],
          [50, "123text", 100],
        ];
        let expectations = new Array(funcOptions.length).fill(false);
        testCurrent(funcOptions, expectations);
      });

      describe("returns false, if end is incorrect", function () {
        let funcOptions = [
          [50, 100, undefined],
          [50, 100, null],
          [50, 100, NaN],
          [50, 100, "text"],
          [50, 100, "123text"],
        ];
        let expectations = new Array(funcOptions.length).fill(false);
        testCurrent(funcOptions, expectations);
      });
    });

  });
}
