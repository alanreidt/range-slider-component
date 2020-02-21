import { assert } from 'chai';

import adjustValueToStep from './adjustValueToStep';

describe('adjustValueToStep', () => {
  const testSubject = adjustValueToStep;

  describe('shall coordinate value with step', () => {
    it(`closest value for value 220, step 100,
    is equal to 200`, () => {
      assert.deepEqual(testSubject(220, 100, 0), 200);
    });

    it(`closest value for value 250 (controversial), step 100,
    is equal to 300`, () => {
      assert.deepEqual(testSubject(250, 100, 0), 300);
    });

    it(`closest value for value 280, step 100,
    is equal to 300`, () => {
      assert.deepEqual(testSubject(280, 100, 0), 300);
    });

    it(`closest value for value 30, step 100,
    is equal to 0`, () => {
      assert.deepEqual(testSubject(30, 100, 0), 0);
    });

    it(`closest value for value 60, step 100,
    is equal to 100`, () => {
      assert.deepEqual(testSubject(60, 100, 0), 100);
    });

    it(`closest value for value -220, step 100,
    is equal to -200`, () => {
      assert.deepEqual(testSubject(-220, 100, 0), -200);
    });

    it(`closest value for value -250, step 100,
    is equal to -200`, () => {
      assert.deepEqual(testSubject(-250, 100, 0), -200);
    });

    it(`closest value for value -280, step 100,
    is equal to -300`, () => {
      assert.deepEqual(testSubject(-280, 100, 0), -300);
    });
  });

  describe('shall take into account offset', () => {
    it(`closest value for value 250, step 100,
    and offset 30 is equal to 230`, () => {
      assert.deepEqual(testSubject(250, 100, 30), 230);
    });

    it(`closest value for value 280, step 100,
    and offset 30 is equal to 330`, () => {
      assert.deepEqual(testSubject(280, 100, 30), 330);
    });

    it(`closest value for value 300, step 100,
    and offset 30 is equal to 330`, () => {
      assert.deepEqual(testSubject(300, 100, 30), 330);
    });

    it(`closest value for value 0, step 100,
    and offset 30 is equal to 30`, () => {
      assert.deepEqual(testSubject(0, 100, 30), 30);
    });

    it(`closest value for value 100, step 100,
    and offset 30 is equal to 130`, () => {
      assert.deepEqual(testSubject(100, 100, 30), 130);
    });

    it(`closest value for value -220, step 100,
    and offset -403 is equal to -203`, () => {
      assert.deepEqual(testSubject(-220, 100, -403), -203);
    });

    it(`closest value for value -253, step 100,
    and offset -403 is equal to -203`, () => {
      assert.deepEqual(testSubject(-253, 100, -403), -203);
    });

    it(`closest value for value -280, step 100,
    and offset -403 is equal to -303`, () => {
      assert.deepEqual(testSubject(-280, 100, -403), -303);
    });

    context('shall handle offset > value', () => {
      it(`closest value for value 220, step 100,
      and offset 530 is equal to 230`, () => {
        assert.deepEqual(testSubject(220, 100, 530), 230);
      });

      it(`closest value for value 280, step 100,
      and offset 530 is equal to 230`, () => {
        assert.deepEqual(testSubject(280, 100, 530), 330);
      });

      it(`closest value for value 300, step 100,
      and offset 530 is equal to 330`, () => {
        assert.deepEqual(testSubject(300, 100, 530), 330);
      });

      it(`closest value for value -220, step 100,
      and offset -3 is equal to -203`, () => {
        assert.deepEqual(testSubject(-220, 100, -3), -203);
      });

      it(`closest value for value -253, step 100,
      and offset -3 is equal to -203`, () => {
        assert.deepEqual(testSubject(-253, 100, -3), -203);
      });

      it(`closest value for value -280, step 100,
      and offset -3 is equal to -303`, () => {
        assert.deepEqual(testSubject(-280, 100, -3), -303);
      });

      it(`closest value for value -150, step 100,
      and offset 70 is equal to -130`, () => {
        assert.deepEqual(testSubject(-150, 100, 70), -130);
      });

      it(`closest value for value -180, step 100,
      and offset 70 is equal to -130`, () => {
        assert.deepEqual(testSubject(-180, 100, 70), -130);
      });

      it(`closest value for value -220, step 100,
      and offset 70 is equal to -230`, () => {
        assert.deepEqual(testSubject(-220, 100, 70), -230);
      });
    });
  });

  describe("shall return NaN, if operation can't be performed", () => {
    it('return NaN, if step equals to 0', () => {
      assert.deepEqual(testSubject(200, 0, 0), NaN);
    });
  });

  describe("shall correct an input, if it's possible", () => {
    context('corrects negative step, removing sign', () => {
      it(`closest value for value 220, step -100,
      is equal to 200`, () => {
        assert.deepEqual(testSubject(220, -100, 0), 200);
      });

      it(`closest value for value 250, step -100,
      is equal to 300`, () => {
        assert.deepEqual(testSubject(250, -100, 0), 300);
      });

      it(`closest value for value 280, step -100,
      is equal to 300`, () => {
        assert.deepEqual(testSubject(280, -100, 0), 300);
      });

      it(`closest value for value 0, step -100,
      is equal to 0`, () => {
        assert.deepEqual(testSubject(0, -100, 0), 0);
      });

      it(`closest value for value -120, step -100,
      is equal to -100`, () => {
        assert.deepEqual(testSubject(-120, -100, 0), -100);
      });
    });

    context('corrects null to 0 for value', () => {
      it(`closest value for value null, step 100,
      is equal to 0`, () => {
        assert.deepEqual(testSubject(null, 100, 0), 0);
      });
    });
  });

  describe('shall catch garbage input', () => {
    context('returns NaN if value parameter is incorrect', () => {
      const testValues = [undefined, Infinity, NaN, 'text', '123text'];

      testValues.forEach((testValue) => {
        it(`returns NaN, if value parameter equals to ${testValue}`, () => {
          assert.deepEqual(testSubject(testValue, 60, 0), NaN);
        });
      });
    });

    context('returns NaN if step parameter is incorrect', () => {
      const testValues = [undefined, null, Infinity, NaN, 'text', '123text'];

      testValues.forEach((testValue) => {
        it(`returns NaN, if step parameter equals to ${testValue}`, () => {
          assert.deepEqual(testSubject(100, testValue, 0), NaN);
        });
      });
    });
  });
});
