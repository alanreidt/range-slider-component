import { assert } from "chai";

import { findClosestDivisible } from "./findClosestDivisible";

describe("findClosestDivisible", () => {
  describe("shall return nearest divisible number", () => {
    it(`nearest divisible number for division of 220 by 100,
    is equal to 200`, () => {
      assert.deepEqual(findClosestDivisible(220, 100), 200);
    });

    it(`nearest divisible number for division of 250 (controversial) by 100,
    is equal to 300`, () => {
      assert.deepEqual(findClosestDivisible(250, 100), 300);
    });

    it(`nearest divisible number for division of 280 by 100,
    is equal to 300`, () => {
      assert.deepEqual(findClosestDivisible(280, 100), 300);
    });

    it(`nearest divisible number for division of 30 by 100,
    is equal to 0`, () => {
      assert.deepEqual(findClosestDivisible(30, 100), 0);
    });

    it(`nearest divisible number for division of 60 by 100,
    is equal to 100`, () => {
      assert.deepEqual(findClosestDivisible(60, 100), 100);
    });

    it(`nearest divisible number for division of -220 by 100,
    is equal to -200`, () => {
      assert.deepEqual(findClosestDivisible(-220, 100), -200);
    });

    it(`nearest divisible number for division of -250 by 100,
    is equal to -200`, () => {
      assert.deepEqual(findClosestDivisible(-250, 100), -200);
    });

    it(`nearest divisible number for division of -280 by 100,
    is equal to -300`, () => {
      assert.deepEqual(findClosestDivisible(-280, 100), -300);
    });
  });

  describe("shall return NaN, if operation can't be performed", () => {
    it("return NaN, if divisor equals to 0", () => {
      assert.deepEqual(findClosestDivisible(200, 0), NaN);
    });

    it("return NaN, if parameters isn't passed", () => {
      assert.deepEqual(findClosestDivisible(), NaN);
    });

    it("return NaN, if only dividend is passed", () => {
      assert.deepEqual(findClosestDivisible(200), NaN);
    });
  });

  describe("shall correct an input, if it's possible", () => {
    context("corrects negative divisor, removing sign", () => {
      it(`nearest divisible number for division of 220 by -100,
      is equal to 200`, () => {
        assert.deepEqual(findClosestDivisible(220, -100), 200);
      });

      it(`nearest divisible number for division of 250 by -100,
      is equal to 300`, () => {
        assert.deepEqual(findClosestDivisible(250, -100), 300);
      });

      it(`nearest divisible number for division of 280 by -100,
      is equal to 300`, () => {
        assert.deepEqual(findClosestDivisible(280, -100), 300);
      });

      it(`nearest divisible number for division of 0 by -100,
      is equal to 0`, () => {
        assert.deepEqual(findClosestDivisible(0, -100), 0);
      });

      it(`nearest divisible number for division of -120 by -100,
      is equal to -100`, () => {
        assert.deepEqual(findClosestDivisible(-120, -100), -100);
      });
    });

    context("corrects null to 0 for dividend", () => {
      it(`nearest divisible number for division of null by 100,
      is equal to 0`, () => {
        assert.deepEqual(findClosestDivisible(null, 100), 0);
      });
    });
  });

  describe("shall catch garbage input", () => {
    context("returns NaN if dividend parameter is incorrect", () => {
      const testValues = [undefined, Infinity, NaN, "text", "123text"];

      testValues.forEach((testValue) => {
        it(`returns NaN, if dividend parameter equals to ${testValue}`, () => {
          assert.deepEqual(findClosestDivisible(testValue, 60), NaN);
        });
      });
    });

    context("returns NaN if divisor parameter is incorrect", () => {
      const testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach((testValue) => {
        it(`returns NaN, if divisor parameter equals to ${testValue}`, () => {
          assert.deepEqual(findClosestDivisible(100, testValue), NaN);
        });
      });
    });
  });
});
