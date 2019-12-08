import { getPositionInPercentageOf } from "./getPositionInPercentageOf";
import { makeTestClass, template } from "../../../tests/testUtilities";


export function testGetPositionInPercentageOf() {


  describe("getPositionInPercentageOf", function () {
    let describeTest = template`position of ${0} between ${1} is ${"expectation"}`;
    let TestClass = makeTestClass(getPositionInPercentageOf, describeTest);

    describe("shall return position", function () {
      let funcOptions = [
        [100, [0, 500]],
        [0, [0, 500]],
        [500, [0, 500]],
        [957, [0, 1000]],
        [250, [200, 700]],
        [0, [-500, 500]],
        [-200, [-500, 500]],
        [-50, [-500, 0]],
        [-350, [-500, -200]],
      ];
      let expectations = ["20%", "0%", "100%", "95.7%", "10%", "50%", "30%", "90%", "50%"];
      let test = new TestClass();
      test.test(funcOptions, expectations);
    });


    describe("shall handle imprecise calculations", function () {
      let funcOptions = [
        [17, [0, 105]],
        [1, [0, 3]],
        [33, [0, 101]],
        [-17, [-105, 0]],
        [-1, [-2, 1]],
      ];
      let expectations = ["16.19048%", "33.33333%", "32.67327%", "83.80952%", "33.33333%"];
      let test = new TestClass();
      test.test(funcOptions, expectations);
    });


    describe("shall return NaN, if value is out of range", function () {
      let funcOptions = [
        [100, [200, 700]],
        [900, [200, 700]],
        [-300, [-200, 700]],
        [300, [-700, -200]],
        [0, [-700, -200]],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);
      let test = new TestClass();
      test.test(funcOptions, expectations);
    });


    context("shall catch garbage input", function () {
      describe("returns NaN, if value parameter is incorrect", function () {
        let funcOptions = [
          [undefined, [-500, 500]],
          [null, [-500, 500]],
          [Infinity, [-500, 500]],
          [NaN, [-500, 500]],
          ["text", [-500, 500]],
          ["123text", [-500, 500]],
        ];
        let expectations = new Array(funcOptions.length).fill(NaN);
        let test = new TestClass();
        test.test(funcOptions, expectations);
      });

      describe("returns NaN, if range parameter is incorrect", function () {
        let funcOptions = [
          [50, [undefined, 500]],
          [50, [null, 500]],
          [50, [Infinity, 500]],
          [50, [NaN, 500]],
          [50, ["text", 500]],
          [50, ["123text", 500]],
        ];
        let expectations = new Array(funcOptions.length).fill(NaN);
        let test = new TestClass();
        test.test(funcOptions, expectations);
      });
    });

  });


}
