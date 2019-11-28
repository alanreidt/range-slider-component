import { translateProportionIntoValue } from "./translateProportionIntoValue";
import { makeTestClass, template } from "../../../tests/testUtilities";


export function testTranslateProportionIntoValue() {


  describe("translateProportionIntoValue", function () {
    let describeTest = template`proportion of ${0} between ${1} is ${"expectation"}`;
    let TestClass = makeTestClass(translateProportionIntoValue, describeTest);

    describe("shall return value", function () {
      let funcOptions = [
        [20, [0, 500]],
        [0, [0, 500]],
        [100, [0, 500]],
        [95.7, [0, 1000]],
        [10, [200, 700]],
        [50, [-500, 500]],
        [30, [-500, 500]],
        [90, [-500, 0]],
        [50, [-500, -200]],
      ];
      let expectations = [100, 0, 500, 957, 250, 0, -200, -50, -350];
      let test = new TestClass();

      test.test(funcOptions, expectations);
    });


    describe("shall handle imprecise calculations", function () {
      let funcOptions = [
        [16.19048, [0, 105]],
        [33.33333, [0, 3]],
        [32.67327, [0, 101]],
        [83.80952, [-105, 0]],
        [33.33333, [-2, 1]],
      ];
      let expectations = [17, 1, 33, -17, -1];
      let test = new TestClass();

      test.test(funcOptions, expectations);
    });


    describe("shall return NaN, if (0 > proportion > 100) is out of range", function () {
      let funcOptions = [
        [101, [200, 700]],
        [200, [200, 700]],
        [-1, [200, 700]],
        [-100, [200, 700]],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);
      let test = new TestClass();

      test.test(funcOptions, expectations);
    });


    context("shall catch garbage input", function () {
      describe("returns NaN, if proportion parameter is incorrect", function () {
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
