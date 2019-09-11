import {getOverstepOf, getNearestDivisibleOf} from "../src/utilities";
import {initialization} from "./specs/initialization/initialization";
import {reassignment} from "./specs/reassignment/reassignment";

/**
 * getOverstepOf TODO:
 *  - shall return overstep
 *    - overstep of 20 over 3,
 *      starting from 0 is equal to 2
 *    - overstep of 81 over 9,
 *      starting from 0 is equal to 0
 *  - shall take into account custom start
 *    - overstep of 20 over 3,
 *      starting from 2 is equal to 0
 *    - overstep of -63 over 30,
 *      starting from -154 is equal to 1
 *  - shall take start as an initial step
 *    - overstep of 10 over 50,
 *      starting from 0 is equal to 10
 *    - overstep of 10 over 50,
 *      starting from 7 is equal to 3
 *    - overstep of 0 over 50,
 *      starting from 0 is equal to 0
 *    - overstep of -220 over 50,
 *      starting from -200 is equal to 20
 *  - shall correct an input, if it's possible
 *    - overstep of 110 over -50 is equal to 10
 *  - shall return undefined if incorrect parameter is passed
 *    - returns undefined if value less, than start
 *      - overstep of -10 over 60,
 *        starting from 0 is equal to undefined
 *      - overstep of -63 over 30,
 *        starting from -4 is equal to undefined
 *    - returns undefined, if zero step is passed
 *  - shall catch garbage input
 *    - returns undefined, if parameters aren't passed
 *    - returns undefined, if value is incorrect
 *      - returns undefined, if value less, than start
 *      - returns undefined, if value equals to undefined
 *      - returns undefined, if value equals to null
 *      - returns undefined, if value equals to Infinity
 *      - returns undefined, if value equals to NaN
 *      - returns undefined, if value equals to "text"
 *      - returns undefined, if value equals to "123text"
 *    - returns undefined, if step is incorrect
 *      - returns undefined, if step equals to 0
 *      - returns undefined, if step equals to undefined
 *      - returns undefined, if step equals to null
 *      - returns undefined, if step equals to Infinity
 *      - returns undefined, if step equals to NaN
 *      - returns undefined, if step equals to "text"
 *      - returns undefined, if step equals to "123text"
 *    - returns undefined, if start is incorrect
 *      - returns undefined, if start equals to undefined
 *      - returns undefined, if start equals to null
 *      - returns undefined, if start equals to Infinity
 *      - returns undefined, if start equals to NaN
 *      - returns undefined, if start equals to "text"
 *      - returns undefined, if start equals to "123text"
 *
 */

describe("getOverstepOf", function() {

  describe("shall return overstep", function() {

    it(`overstep of 20 over 3 is equal to 2`, function() {
      assert.deepEqual( getOverstepOf(20, 3), 2 );
    });

    it(`overstep of 81 over 9 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(81, 9), 0 );
    });

  });


  describe("shall take into account custom start", function() {

    it(`overstep of 20 over 3, starting from 2 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(20, 3, 2), 0 );
    });

    it(`overstep of -63 over 30, starting from -154 is equal to 1`, function() {
      assert.deepEqual( getOverstepOf(-63, 30, -154), 1 );
    });

  });


  describe("shall take start as an initial step", function() {

    it(`overstep of 10 over 50, starting from 0 is equal to 10`, function() {
      assert.deepEqual( getOverstepOf(10, 50), 10 );
    });

    it(`overstep of 10 over 50, starting from 7 is equal to 3`, function() {
      assert.deepEqual( getOverstepOf(10, 50, 7), 3 );
    });

    it(`overstep of 0 over 50, starting from 0 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(0, 50), 0 );
    });

    it(`overstep of -220 over 50, starting from -200 is equal to 20`, function() {
      assert.deepEqual( getOverstepOf(-220, 50, -200), 20 );
    });

  });


  describe("shall correct an input, if it's possible", function() {

    context("corrects negative step", function() {
      it("overstep of 110 over -50 is equal to 10", function() {
        assert.deepEqual( getOverstepOf(110, -50), 10 );
      });
    });

  });


  describe("shall return undefined if incorrect parameter is passed", function() {

    it("return undefined, if zero step is passed", function() {
      assert.deepEqual( getOverstepOf(100, 0), undefined );
    });

    context("returns undefined if value less, than start", function() {
      it(`overstep of -10 over 60, starting from 0 is equal to undefined`, function() {
        assert.deepEqual( getOverstepOf(-10, 60), undefined );
      });

      it(`overstep of -63 over 30, starting from -4 is equal to undefined`, function() {
        assert.deepEqual( getOverstepOf(-63, 30, -4), undefined );
      });
    });

  });


  describe("shall catch garbage input", function() {

    it("return undefined, if parameters aren't passed", function() {
      assert.deepEqual( getOverstepOf(), undefined );
    });

    context("returns undefined if value parameter is incorrect", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns undefined, if value parameter equals to ${testValue}`, function() {
          assert.deepEqual( getOverstepOf(testValue, 60), undefined );
        });

      });
    });

    context("returns undefined if step parameter is incorrect", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns undefined, if step parameter equals to ${testValue}`, function() {
          assert.deepEqual( getOverstepOf(100, testValue), undefined );
        });

      });
    });

    context("returns undefined if start parameter is incorrect", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns undefined, if start parameter equals to ${testValue}`, function() {
          assert.deepEqual( getOverstepOf(100, 60, testValue), undefined );
        });

      });
    });

  });


  describe("should accept start or end, as a starting point", function() {

    it(`overstep of -63 over 30, starting from 3 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(-63, 30, 3), 14 );
    });

    it(`overstep of -63 over 30, starting from -4 is equal to 1`, function() {
      assert.deepEqual( getOverstepOf(-63, 30, -4), 1 );
    });

  });

});


/**
 * getNearestDivisibleOf TODO:
 *  - shall return nearest divisible number
 *    - nearest divisible number for division of 220 by 100,
 *      is equal to 200
 *    - nearest divisible number for division of 250 (controvertial) by 100,
 *      is equal to 300
 *    - nearest divisible number for division of 280 by 100,
 *      is equal to 300
 *    - nearest divisible number for division of 0 by 100,
 *      is equal to 0
 *    - nearest divisible number for division of -220 by 100,
 *      is equal to -200
 *  - shall take into account start
 *    - nearest divisible number for division of 250 by 100,
 *      starting from 30 is equal to 230
 *    - nearest divisible number for division of 0 by 100,
 *      starting from 30 is equal to 30
 *    - nearest divisible number for division of -220 by 100,
 *      starting from -3 is equal to -203
 *  - shall return undifined, if operation can't be performed
 *    - return undefined, if divisor equals to 0
 *    - return undefined, if parameters isn't passed
 *    - return undefined, if only dividend is passed
 *
 */

describe("getNearestDivisibleOf", function() {

  describe("shall return nearest divisible number", function() {

    it(`nearest divisible number for division of 220 by 100,
    is equal to 200`, function() {
      assert.deepEqual( getNearestDivisibleOf(220, 100), 200 );
    });

    it(`nearest divisible number for division of 250 (controvertial) by 100,
    is equal to 300`, function() {
      assert.deepEqual( getNearestDivisibleOf(250, 100), 300 );
    });

    it(`nearest divisible number for division of 280 by 100,
    is equal to 300`, function() {
      assert.deepEqual( getNearestDivisibleOf(280, 100), 300 );
    });

    it(`nearest divisible number for division of 0 by 100,
    is equal to 0`, function() {
      assert.deepEqual( getNearestDivisibleOf(0, 100), 0 );
    });

    it(`nearest divisible number for division of -220 by 100,
    is equal to -200`, function() {
      assert.deepEqual( getNearestDivisibleOf(-220, 100), -200 );
    });

  });


  describe("shall take into account start", function() {

    it(`nearest divisible number for division of 250 by 100,
    starting from 30 is equal to 230`, function() {
      assert.deepEqual( getNearestDivisibleOf(250, 100, 30), 230 );
    });

    it(`nearest divisible number for division of 0 by 100,
    starting from 30 is equal to 30`, function() {
      assert.deepEqual( getNearestDivisibleOf(0, 100, 30), 30 );
    });

    it(`nearest divisible number for division of -220 by 100,
    starting from -3 is equal to -203`, function() {
      assert.deepEqual( getNearestDivisibleOf(-220, 100, -3), -203 );
    });

  });


  describe("shall return undifined, if operation can't be performed", function() {

    it("return undefined, if divisor equals to 0", function() {
      assert.deepEqual( getNearestDivisibleOf(200, 0), undefined );
    });

    it("return undefined, if parameters isn't passed", function() {
      assert.deepEqual( getNearestDivisibleOf(), undefined );
    });

    it("return undefined, if only dividend is passed", function() {
      assert.deepEqual( getNearestDivisibleOf(200), undefined );
    });

    it(`(!!!) nearest divisible number for division of -220 by 100,
    starting from -3 is equal to -203`, function() {
      assert.deepEqual( getNearestDivisibleOf(-220, 100, 70), undefined );
    });

  });

});


/**
 * Slider TODO:
 *  - add tests for all functions with negative numbers and floats
 *  - Initialization test (+):
 *    - shall assign default values for unpassed parameters (++)
 *      - shall assign default values, if nothing is passed (++)
 *      - shall assign default values for unpassed parameters,
 *        if only part is passed (++)
 *    - shall assign fixed values for incorrect arguments (++)
 *      - shall assign default value if incorrect one is passed (++)
 *      - shall parse number from mixed inputs (++)
 *  - Reassignment test:
 *    - shall change values, if correct one is passed (+)
 *    - shall not change values, if incorrect one is passed (+)
 *    - shall correct values (+)
 *      - shall correct {value}, if passed value isn't correspond to {step} (+)
 *      - shall correct {value}, if passed value is out of {boundaries} (+)
 *      - shall correct {step}, if passed value isn't correspond to {boundaries(range)} (+)
 *      - shall correct {step}, if passed value is bigger than difference of {boundaries(range)} (+)
 *      - {boundaries} on change, shall correct {value},
 *        if it became out of the range (+)
 *      - {boundaries} on change, shall correct {step},
 *        if it stopped to correspond to the range (+)
 *      - {boundaries} shall correct {step}, if it became bigger,
 *        than difference of {boundaries(range)} (+)
 *      - {step} on change, shall correct {value},
 *        if it stopped to correspond to its value (+)
 *    - shall change nearest {boundaries} value, if only a number is passed (+)
 *      - shall change {boundaries(min)}, if passed value lay near to it (+)
 *      - shall change {boundaries(max)}, if passed value lay near to it (+)
 *    - shall accept unlimited array of {value} values
 *      - shall accept array of {value} values (+)
 *      - shall accept array of {value} values and correct incorrect (+)
 *    - {value} shall be equal to average of boundaries by default (+)
 *  - Business Logic:
 *    - in general:
 *      - should allow to define min/max distance between handles
 *      - should output made corrections
 *    - options:
 *      - default values:
 *        - boudaries: [0, 100],
 *        - value: ({boundaries(max)} - {boundaries(min)}) / 2,
 *        - step: null,
 *        - orientation: "horizontal",
 *        - tooltips: false,
 *      - boundaries:
 *        - shall accept array of numbers (+)
 *        - should also accept numbers (would change appropriate previous one) (+)
 *        - shall leave array with previous values instead of incorrect input
 *          ( isNaN( parseFloat(value) ) ) (+)
 *        - should assign previous values instead of each incorrect one (+)
 *        - shall correct {value} if it's out of {boundaries(range)} (+)
 *        - shall correct {step} if it's not correspond (boundaries % step !== 0) (+)
 *        - shall correct {step} to difference of {boundaries(range)} if passed value > than that (+)
 *        - should change direction (ltr or rtl) according to inputed value order
 *        - should accept not only "numbers" (colors)
 *      - value:
 *        - shall accept number or array of numbers — will result in mono-valued or multi-valued slider,
 *          accordingly (+)
 *        - shall assign previous value instead of incorrect input
 *          ( isNaN( parseFloat(value) ) ) (+)
 *        - should assign correct values and cut off incorred ones (+)
 *        - shall be equal to average of {boundaries}, if it isn't changed (+)
 *        - shall round value to the nearest possible, in order to correspond to {step} (+)
 *        - shall assign value to the nearest {boundaries(max)} or {boundaries(min)},
 *          if number is out of {boundaries} range (+)
 *        - should accept keywords: min(start), middle(center), max(end)
 *      - step:
 *        - shall accept only positive number (+)
 *        - shall round value to the nearest possible one if (boundaries % step !== 0) (+)
 *        - shall assign value to difference of {boundaries(range)} if passed value > than that
 *        - shall correct {value} in order to correspond to its value (+)
 *        - should accept quantity of steps somehow
 *        - should allow to skip some values
 *      - orientation:
 *        - shall accept only string "horizontal" or "vertical" (+)
 *        - shall assign default value if incorrect one is passed (+)
 *      - tooltips:
 *        - shall accept only boolean true or false (!) (+)
 *        - shall assign default value if incorrect one is passed (+)
 */

describe("Slider", function() {

  describe("Initialization test", function() {
    initialization();
  });

  describe("Reassignment test", function() {
    reassignment();
  });

});
