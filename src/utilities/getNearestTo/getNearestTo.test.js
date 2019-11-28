import { getNearestTo } from "./getNearestTo";
import { test, template } from "../../../tests/testUtilities";

export function testGetNearestTo() {
  describe("getNearestTo", function () {
    let describeTest = template`nearest number to ${0} from ${"...rest"} is ${"expectation"}`;
    let testCurrent = test(getNearestTo, describeTest);

    describe("shall return nearest number to value", function () {
      let funcOptions = [
        [100, 50, 90],
        [-100, -50, -90],
        [0, -50, 90],
        [250, -100, 100],
        [250, -100, 100, 250],
        [100, 50, 90, 105],
      ];
      let expectations = [90, -90, -50, 100, 250, 105];
      testCurrent(funcOptions, expectations);
    });


    describe("shall return last nearest number to value, if controvertial", function () {
      let funcOptions = [
        [100, 99, 105, 101, 5],
        [100, 101, 105, 99, 5],
      ];
      let expectations = [101, 99];
      testCurrent(funcOptions, expectations);
    });


    describe("shall filter incorrect arguments", function () {
      let funcOptions = [
        [100, null, 105, undefined, 5],
        [0, null, 105, Infinity, 5],
      ];
      let expectations = [105, 5];
      testCurrent(funcOptions, expectations);
    });


    context("shall catch garbage input", function () {
      describe("returns NaN if value parameter is incorrect", function () {
        let funcOptions = [
          [undefined, -100, 100],
          [null, -100, 100],
          [Infinity, -100, 100],
          [NaN, -100, 100],
          ["text", -100, 100],
          ["123text", -100, 100],
        ];
        let expectations = new Array(funcOptions.length).fill(NaN);
        testCurrent(funcOptions, expectations);
      });

      describe("returns NaN if args parameter is incorrect", function () {
        let funcOptions = [
          [50, undefined],
          [50, null],
          [50, Infinity],
          [50, NaN],
          [50, "text"],
          [50, "123text"],
        ];
        let expectations = new Array(funcOptions.length).fill(NaN);
        testCurrent(funcOptions, expectations);
      });
    });

  });
}
