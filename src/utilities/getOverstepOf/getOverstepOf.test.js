import { assert } from "chai";

import { getOverstepOf } from "./getOverstepOf";

export function testGetOverstepOf() {
  describe("getOverstepOf", () => {
    describe("shall return overstep", () => {
      it(`overstep of 20 over 3, starting from 0 is equal to 2`, () => {
        assert.deepEqual(getOverstepOf(20, 3), 2);
      });

      it(`overstep of 81 over 9, starting from 0 is equal to 0`, () => {
        assert.deepEqual(getOverstepOf(81, 9), 0);
      });
    });

    describe("shall take into account custom start", () => {
      it(`overstep of 20 over 3, starting from 2 is equal to 0`, () => {
        assert.deepEqual(getOverstepOf(20, 3, 2), 0);
      });

      it(`overstep of -63 over 30, starting from -94 is equal to 1`, () => {
        assert.deepEqual(getOverstepOf(-63, 30, -94), 1);
      });
    });

    describe("shall take start as an initial step", () => {
      it(`overstep of 10 over 50, starting from 0 is equal to 10`, () => {
        assert.deepEqual(getOverstepOf(10, 50), 10);
      });

      it(`overstep of 10 over 50, starting from 7 is equal to 3`, () => {
        assert.deepEqual(getOverstepOf(10, 50, 7), 3);
      });

      it(`overstep of 0 over 50, starting from 0 is equal to 0`, () => {
        assert.deepEqual(getOverstepOf(0, 50), 0);
      });

      it(`overstep of -220 over 50, starting from -240 is equal to 20`, () => {
        assert.deepEqual(getOverstepOf(-220, 50, -240), 20);
      });
    });

    describe("shall correct an input, if it's possible", () => {
      context("corrects negative step", () => {
        it("overstep of 110 over -50 is equal to 10", () => {
          assert.deepEqual(getOverstepOf(110, -50), 10);
        });
      });

      context("corrects value parameter if it equals to null", () => {
        it("overstep of null over 50 is equal to 0", () => {
          assert.deepEqual(getOverstepOf(null, 50), 0);
        });
      });

      context("reset start parameter if incorrect one is passed", () => {
        const testValues = [undefined, null, Infinity, NaN, "text", "123text"];

        testValues.forEach((testValue) => {
          it(`overstep of 100 over 60 is equal to 40,
          if start parameter equals to ${testValue}`, () => {
            assert.deepEqual(getOverstepOf(100, 60, testValue), 40);
          });
        });
      });
    });

    describe("shall return undefined if incorrect parameter is passed", () => {
      it("return undefined, if zero step is passed", () => {
        assert.deepEqual(getOverstepOf(100, 0), undefined);
      });

      context("returns undefined if value less, than start", () => {
        it(`overstep of -10 over 60, starting from 0 is equal to undefined`, () => {
          assert.deepEqual(getOverstepOf(-10, 60), undefined);
        });

        it(`overstep of -63 over 30, starting from -4 is equal to undefined`, () => {
          assert.deepEqual(getOverstepOf(-63, 30, -4), undefined);
        });
      });
    });

    describe("shall catch garbage input", () => {
      it("return undefined, if parameters aren't passed", () => {
        assert.deepEqual(getOverstepOf(), undefined);
      });

      context("returns undefined if value parameter is incorrect", () => {
        const testValues = [undefined, Infinity, NaN, "text", "123text"];

        testValues.forEach((testValue) => {
          it(`returns undefined, if value parameter equals to ${testValue}`, () => {
            assert.deepEqual(getOverstepOf(testValue, 60), undefined);
          });
        });
      });

      context("returns undefined if step parameter is incorrect", () => {
        const testValues = [undefined, null, Infinity, NaN, "text", "123text"];

        testValues.forEach((testValue) => {
          it(`returns undefined, if step parameter equals to ${testValue}`, () => {
            assert.deepEqual(getOverstepOf(100, testValue), undefined);
          });
        });
      });
    });

    describe("should accept start or end, as a starting point", () => {
      it(`overstep of -63 over 30, starting from 3 is equal to 0`, () => {
        assert.deepEqual(getOverstepOf(-63, 30, 3), 14);
      });

      it(`overstep of -63 over 30, starting from -4 is equal to 1`, () => {
        assert.deepEqual(getOverstepOf(-63, 30, -4), 1);
      });
    });
  });
}
