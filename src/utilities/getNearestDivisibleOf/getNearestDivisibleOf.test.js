import { assert } from "chai";

import { getNearestDivisibleOf } from "./getNearestDivisibleOf";

export function testGetNearestDivisibleOf() {
  describe("getNearestDivisibleOf", () => {
    describe("shall return nearest divisible number", () => {
      it(`nearest divisible number for division of 220 by 100,
      is equal to 200`, () => {
        assert.deepEqual(getNearestDivisibleOf(220, 100), 200);
      });

      it(`nearest divisible number for division of 250 (controversial) by 100,
      is equal to 300`, () => {
        assert.deepEqual(getNearestDivisibleOf(250, 100), 300);
      });

      it(`nearest divisible number for division of 280 by 100,
      is equal to 300`, () => {
        assert.deepEqual(getNearestDivisibleOf(280, 100), 300);
      });

      it(`nearest divisible number for division of 30 by 100,
      is equal to 0`, () => {
        assert.deepEqual(getNearestDivisibleOf(30, 100), 0);
      });

      it(`nearest divisible number for division of 60 by 100,
      is equal to 100`, () => {
        assert.deepEqual(getNearestDivisibleOf(60, 100), 100);
      });

      it(`nearest divisible number for division of -220 by 100,
      is equal to -200`, () => {
        assert.deepEqual(getNearestDivisibleOf(-220, 100), -200);
      });

      it(`nearest divisible number for division of -250 by 100,
      is equal to -200`, () => {
        assert.deepEqual(getNearestDivisibleOf(-250, 100), -200);
      });

      it(`nearest divisible number for division of -280 by 100,
      is equal to -300`, () => {
        assert.deepEqual(getNearestDivisibleOf(-280, 100), -300);
      });
    });

    describe("shall take into account start", () => {
      it(`nearest divisible number for division of 250 by 100,
      starting from 30 is equal to 230`, () => {
        assert.deepEqual(getNearestDivisibleOf(250, 100, 30), 230);
      });

      it(`nearest divisible number for division of 280 by 100,
      starting from 30 is equal to 330`, () => {
        assert.deepEqual(getNearestDivisibleOf(280, 100, 30), 330);
      });

      it(`nearest divisible number for division of 300 by 100,
      starting from 30 is equal to 330`, () => {
        assert.deepEqual(getNearestDivisibleOf(300, 100, 30), 330);
      });

      it(`nearest divisible number for division of 0 by 100,
      starting from 30 is equal to 30`, () => {
        assert.deepEqual(getNearestDivisibleOf(0, 100, 30), 30);
      });

      it(`nearest divisible number for division of 100 by 100,
      starting from 30 is equal to 130`, () => {
        assert.deepEqual(getNearestDivisibleOf(100, 100, 30), 130);
      });

      it(`nearest divisible number for division of -220 by 100,
      starting from -403 is equal to -203`, () => {
        assert.deepEqual(getNearestDivisibleOf(-220, 100, -403), -203);
      });

      it(`nearest divisible number for division of -253 by 100,
      starting from -403 is equal to -203`, () => {
        assert.deepEqual(getNearestDivisibleOf(-253, 100, -403), -203);
      });

      it(`nearest divisible number for division of -280 by 100,
      starting from -403 is equal to -303`, () => {
        assert.deepEqual(getNearestDivisibleOf(-280, 100, -403), -303);
      });

      context("handles when start property is end", () => {
        it(`nearest divisible number for division of 220 by 100,
        starting from 530 is equal to 230`, () => {
          assert.deepEqual(getNearestDivisibleOf(220, 100, 530), 230);
        });

        it(`nearest divisible number for division of 280 by 100,
        starting from 530 is equal to 230`, () => {
          assert.deepEqual(getNearestDivisibleOf(280, 100, 530), 330);
        });

        it(`nearest divisible number for division of 300 by 100,
        starting from 530 is equal to 330`, () => {
          assert.deepEqual(getNearestDivisibleOf(300, 100, 530), 330);
        });

        it(`nearest divisible number for division of -220 by 100,
        starting from -3 is equal to -203`, () => {
          assert.deepEqual(getNearestDivisibleOf(-220, 100, -3), -203);
        });

        it(`nearest divisible number for division of -253 by 100,
        starting from -3 is equal to -203`, () => {
          assert.deepEqual(getNearestDivisibleOf(-253, 100, -3), -203);
        });

        it(`nearest divisible number for division of -280 by 100,
        starting from -3 is equal to -303`, () => {
          assert.deepEqual(getNearestDivisibleOf(-280, 100, -3), -303);
        });

        it(`nearest divisible number for division of -150 by 100,
        starting from 70 is equal to -130`, () => {
          assert.deepEqual(getNearestDivisibleOf(-150, 100, 70), -130);
        });

        it(`nearest divisible number for division of -180 by 100,
        starting from 70 is equal to -130`, () => {
          assert.deepEqual(getNearestDivisibleOf(-180, 100, 70), -130);
        });

        it(`nearest divisible number for division of -220 by 100,
        starting from 70 is equal to -230`, () => {
          assert.deepEqual(getNearestDivisibleOf(-220, 100, 70), -230);
        });
      });
    });

    describe("shall return NaN, if operation can't be performed", () => {
      it("return NaN, if divisor equals to 0", () => {
        assert.deepEqual(getNearestDivisibleOf(200, 0), NaN);
      });

      it("return NaN, if parameters isn't passed", () => {
        assert.deepEqual(getNearestDivisibleOf(), NaN);
      });

      it("return NaN, if only dividend is passed", () => {
        assert.deepEqual(getNearestDivisibleOf(200), NaN);
      });
    });

    describe("shall correct an input, if it's possible", () => {
      context("corrects negative divisor, removing sign", () => {
        it(`nearest divisible number for division of 220 by -100,
        is equal to 200`, () => {
          assert.deepEqual(getNearestDivisibleOf(220, -100), 200);
        });

        it(`nearest divisible number for division of 250 by -100,
        is equal to 300`, () => {
          assert.deepEqual(getNearestDivisibleOf(250, -100), 300);
        });

        it(`nearest divisible number for division of 280 by -100,
        is equal to 300`, () => {
          assert.deepEqual(getNearestDivisibleOf(280, -100), 300);
        });

        it(`nearest divisible number for division of 0 by -100,
        is equal to 0`, () => {
          assert.deepEqual(getNearestDivisibleOf(0, -100), 0);
        });

        it(`nearest divisible number for division of -120 by -100,
        is equal to -100`, () => {
          assert.deepEqual(getNearestDivisibleOf(-120, -100), -100);
        });
      });

      context("corrects null to 0 for dividend", () => {
        it(`nearest divisible number for division of null by 100,
        is equal to 0`, () => {
          assert.deepEqual(getNearestDivisibleOf(null, 100), 0);
        });
      });
    });

    describe("shall catch garbage input", () => {
      context("returns NaN if dividend parameter is incorrect", () => {
        const testValues = [undefined, Infinity, NaN, "text", "123text"];

        testValues.forEach((testValue) => {
          it(`returns NaN, if dividend parameter equals to ${testValue}`, () => {
            assert.deepEqual(getNearestDivisibleOf(testValue, 60), NaN);
          });
        });
      });

      context("returns NaN if divisor parameter is incorrect", () => {
        const testValues = [undefined, null, Infinity, NaN, "text", "123text"];

        testValues.forEach((testValue) => {
          it(`returns NaN, if divisor parameter equals to ${testValue}`, () => {
            assert.deepEqual(getNearestDivisibleOf(100, testValue), NaN);
          });
        });
      });
    });
  });
}
