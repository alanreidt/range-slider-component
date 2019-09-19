import {getOverstepOf, getNearestDivisibleOf, isValueInBetween, getNearestTo} from "../src/utilities";
import {initialization} from "./specs/initialization/initialization";
import {reassignment} from "./specs/reassignment/reassignment";

function test(func, describeTest = template`${0} between ${1} and ${2} is equal to ${3}`) {
  return function (funcOptions, expectations) {

    expectations.forEach( (expectation, index) => {
      let funcOption = funcOptions[index];

      it(describeTest(funcOption, expectation), function() {
        assert.deepEqual( func(...funcOption), expectation );
      });
    });

  }
}

function template(strings, ...keys) {

  return function(values, expectation) {
    let dict = values[values.length - 1] || {};
    let result = [strings[0]];

    keys.forEach( (key, i) => {
      let value = `${Number.isInteger(key) ? values[key] :
        (key === "...rest") ? values.slice(i) :
        (key === "expectation") ? expectation : dict[key]}`;

      result.push(value, strings[i + 1]);
    });

    return result.join('');
  };

}


describe("getNearestTo", function() {
  let describeTest = template`nearest number to ${0} from ${"...rest"} is ${"expectation"}`;
  let testCurrent = test(getNearestTo, describeTest);

  describe("shall return nearest number to value", function() {
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

  describe("shall return last nearest number to value, if controvertial", function() {
    let funcOptions = [
      [100, 99, 105, 101, 5],
      [100, 101, 105, 99, 5],
    ];
    let expectations = [101, 99];

    testCurrent(funcOptions, expectations);
  });

  describe("shall filter incorrect arguments", function() {
    let funcOptions = [
      [100, null, 105, undefined, 5],
      [0, null, 105, Infinity, 5],
    ];
    let expectations = [105, 5];

    testCurrent(funcOptions, expectations);
  });

  context("shall catch garbage input", function() {
    describe("returns NaN if value parameter is incorrect", function() {
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

    describe("returns NaN if args parameter is incorrect", function() {
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


describe("isValueInBetween", function() {
  let testCurrent = test(isValueInBetween);

  describe("shall return true, if value is between start and end", function() {
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

  describe("shall return false, if value is not between start and end", function() {
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

  describe("shall handle input, when start is end and vice versa", function() {
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

  describe("shall not include extremums", function() {
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

  describe("shall return false, if there is no value in between", function() {
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

  context("shall catch garbage input", function() {
    describe("returns false, if value is incorrect", function() {
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

    describe("returns false, if start is incorrect", function() {
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

    describe("returns false, if end is incorrect", function() {
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


describe("getOverstepOf", function() {

  describe("shall return overstep", function() {

    it(`overstep of 20 over 3, starting from 0 is equal to 2`, function() {
      assert.deepEqual( getOverstepOf(20, 3), 2 );
    });

    it(`overstep of 81 over 9, starting from 0 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(81, 9), 0 );
    });

  });


  describe("shall take into account custom start", function() {

    it(`overstep of 20 over 3, starting from 2 is equal to 0`, function() {
      assert.deepEqual( getOverstepOf(20, 3, 2), 0 );
    });

    it(`overstep of -63 over 30, starting from -94 is equal to 1`, function() {
      assert.deepEqual( getOverstepOf(-63, 30, -94), 1 );
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

    it(`overstep of -220 over 50, starting from -240 is equal to 20`, function() {
      assert.deepEqual( getOverstepOf(-220, 50, -240), 20 );
    });

  });


  describe("shall correct an input, if it's possible", function() {

    context("corrects negative step", function() {
      it("overstep of 110 over -50 is equal to 10", function() {
        assert.deepEqual( getOverstepOf(110, -50), 10 );
      });
    });

    context("corrects value parameter if it equals to null", function() {
      it("overstep of null over 50 is equal to 0", function() {
        assert.deepEqual( getOverstepOf(null, 50), 0 );
      });
    });

    context("reset start parameter if incorrect one is passed", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`overstep of 100 over 60 is equal to 40,
        if start parameter equals to ${testValue}`, function() {
          assert.deepEqual( getOverstepOf(100, 60, testValue), 40 );
        });

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
      let testValues = [undefined, Infinity, NaN, "text", "123text"];

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

    it(`nearest divisible number for division of 30 by 100,
    is equal to 0`, function() {
      assert.deepEqual( getNearestDivisibleOf(30, 100), 0 );
    });

    it(`nearest divisible number for division of 60 by 100,
    is equal to 100`, function() {
      assert.deepEqual( getNearestDivisibleOf(60, 100), 100 );
    });

    it(`nearest divisible number for division of -220 by 100,
    is equal to -200`, function() {
      assert.deepEqual( getNearestDivisibleOf(-220, 100), -200 );
    });

    it(`nearest divisible number for division of -250 by 100,
    is equal to -200`, function() {
      assert.deepEqual( getNearestDivisibleOf(-250, 100), -200 );
    });
    it(`nearest divisible number for division of -280 by 100,
    is equal to -300`, function() {
      assert.deepEqual( getNearestDivisibleOf(-280, 100), -300 );
    });

  });


  describe("shall take into account start", function() {

    it(`nearest divisible number for division of 250 by 100,
    starting from 30 is equal to 230`, function() {
      assert.deepEqual( getNearestDivisibleOf(250, 100, 30), 230 );
    });

    it(`nearest divisible number for division of 280 by 100,
    starting from 30 is equal to 330`, function() {
      assert.deepEqual( getNearestDivisibleOf(280, 100, 30), 330 );
    });

    it(`nearest divisible number for division of 300 by 100,
    starting from 30 is equal to 330`, function() {
      assert.deepEqual( getNearestDivisibleOf(300, 100, 30), 330 );
    });

    it(`nearest divisible number for division of 0 by 100,
    starting from 30 is equal to 30`, function() {
      assert.deepEqual( getNearestDivisibleOf(0, 100, 30), 30 );
    });

    it(`nearest divisible number for division of 100 by 100,
    starting from 30 is equal to 130`, function() {
      assert.deepEqual( getNearestDivisibleOf(100, 100, 30), 130 );
    });

    it(`nearest divisible number for division of -220 by 100,
    starting from -403 is equal to -203`, function() {
      assert.deepEqual( getNearestDivisibleOf(-220, 100, -403), -203 );
    });

    it(`nearest divisible number for division of -253 by 100,
    starting from -403 is equal to -203`, function() {
      assert.deepEqual( getNearestDivisibleOf(-253, 100, -403), -203 );
    });

    it(`nearest divisible number for division of -280 by 100,
    starting from -403 is equal to -303`, function() {
      assert.deepEqual( getNearestDivisibleOf(-280, 100, -403), -303 );
    });

    context("handles when start property is end", function() {
      it(`nearest divisible number for division of 220 by 100,
      starting from 530 is equal to 230`, function() {
        assert.deepEqual( getNearestDivisibleOf(220, 100, 530), 230 );
      });

      it(`nearest divisible number for division of 280 by 100,
      starting from 530 is equal to 230`, function() {
        assert.deepEqual( getNearestDivisibleOf(280, 100, 530), 330 );
      });

      it(`nearest divisible number for division of 300 by 100,
      starting from 530 is equal to 330`, function() {
        assert.deepEqual( getNearestDivisibleOf(300, 100, 530), 330 );
      });

      it(`nearest divisible number for division of -220 by 100,
      starting from -3 is equal to -203`, function() {
        assert.deepEqual( getNearestDivisibleOf(-220, 100, -3), -203 );
      });

      it(`nearest divisible number for division of -253 by 100,
      starting from -3 is equal to -203`, function() {
        assert.deepEqual( getNearestDivisibleOf(-253, 100, -3), -203 );
      });

      it(`nearest divisible number for division of -280 by 100,
      starting from -3 is equal to -303`, function() {
        assert.deepEqual( getNearestDivisibleOf(-280, 100, -3), -303 );
      });

      it(`nearest divisible number for division of -150 by 100,
      starting from 70 is equal to -130`, function() {
        assert.deepEqual( getNearestDivisibleOf(-150, 100, 70), -130 );
      });

      it(`nearest divisible number for division of -180 by 100,
      starting from 70 is equal to -130`, function() {
        assert.deepEqual( getNearestDivisibleOf(-180, 100, 70), -130 );
      });

      it(`nearest divisible number for division of -220 by 100,
      starting from 70 is equal to -230`, function() {
        assert.deepEqual( getNearestDivisibleOf(-220, 100, 70), -230 );
      });
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

  });


  describe("shall correct an input, if it's possible", function() {

    context("corrects negative divisor, removing sign", function() {
      it(`nearest divisible number for division of 220 by -100,
      is equal to 200`, function() {
        assert.deepEqual( getNearestDivisibleOf(220, -100), 200 );
      });

      it(`nearest divisible number for division of 250 by -100,
      is equal to 300`, function() {
        assert.deepEqual( getNearestDivisibleOf(250, -100), 300 );
      });

      it(`nearest divisible number for division of 280 by -100,
      is equal to 300`, function() {
        assert.deepEqual( getNearestDivisibleOf(280, -100), 300 );
      });

      it(`nearest divisible number for division of 0 by -100,
      is equal to 0`, function() {
        assert.deepEqual( getNearestDivisibleOf(0, -100), 0 );
      });

      it(`nearest divisible number for division of -120 by -100,
      is equal to -100`, function() {
        assert.deepEqual( getNearestDivisibleOf(-120, -100), -100 );
      });
    });

    context("corrects null to 0 for dividend", function() {
      it(`nearest divisible number for division of null by 100,
      is equal to 0`, function() {
        assert.deepEqual( getNearestDivisibleOf(null, 100), 0 );
      });
    });

  });

  describe("shall catch garbage input", function() {

    context("returns undefined if dividend parameter is incorrect", function() {
      let testValues = [undefined, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns undefined, if dividend parameter equals to ${testValue}`, function() {
          assert.deepEqual( getNearestDivisibleOf(testValue, 60), undefined );
        });

      });
    });

    context("returns undefined if divisor parameter is incorrect", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns undefined, if divisor parameter equals to ${testValue}`, function() {
          assert.deepEqual( getNearestDivisibleOf(100, testValue), undefined );
        });

      });
    });

  });

});


describe("Slider", function() {

  describe("Initialization test", function() {
    initialization();
  });

  describe("Reassignment test", function() {
    reassignment();
  });

});
