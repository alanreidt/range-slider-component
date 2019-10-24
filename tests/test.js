import {getOverstepOf, getNearestDivisibleOf, isValueBetween, getNearestTo, getClosestFactorOf, observerMixin, getPositionInPercentageOf, createBase, createHandle, createTooltip, setElementPosition, updateHandlePositions, createHandleGroup, composeHandleGroup, composeHandleGroups} from "../src/utilities";
import {makeTestClass, test, testClass, template} from "./testUtilities";
import {Slider} from "../src/Slider";
import {Model} from "../src/Model";
import {initialization} from "./specs/initialization/initialization";
import {reassignment} from "./specs/reassignment/reassignment";
import { SliderUI } from "../src/SliderUI";


describe("getClosestFactorOf", function() {
  let describeTest = template`nearest divisor of division of ${0} by ${1} is ${"expectation"}`;
  let TestClass = makeTestClass(getClosestFactorOf, describeTest);

  describe("shall return nearest divisor", function() {
    let funcOptions = [
      [900, 250],
      [120, 25],
      [100, 15],
      [500, 375],
      [500, -375],
      [100, 50],
      [100, 100],
      [25, 120],
      [500, 0],
    ];
    let expectations = [225, 24, 20, 500, 1, 50, 100, 25, 1];

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall return NaN, when operation can't be performed", function() {
    let funcOptions = [
      [0, 375],
      [0, 0],
      [-120, 25],
      [-500, -375],
    ];
    let expectations = new Array(funcOptions.length).fill(NaN);

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", function() {
    describe("returns NaN, if dividend parameter is incorrect", function() {
      let funcOptions = [
        [undefined, 25],
        [null, 25],
        [Infinity, 25],
        [NaN, 25],
        ["text", 25],
        ["123text", 25],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);

      let test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if divisor parameter is incorrect", function() {
      let funcOptions = [
        [50, undefined],
        [50, null],
        [50, Infinity],
        [50, NaN],
        [50, "text"],
        [50, "123text"],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);

      let test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });

});

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


describe("isValueBetween", function() {
  let describeTest = template`${0} between ${1} and ${2} is equal to ${"expectation"}`;
  let testCurrent = test(isValueBetween, describeTest);

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


  describe("shall return NaN, if operation can't be performed", function() {

    it("return NaN, if divisor equals to 0", function() {
      assert.deepEqual( getNearestDivisibleOf(200, 0), NaN );
    });

    it("return NaN, if parameters isn't passed", function() {
      assert.deepEqual( getNearestDivisibleOf(), NaN );
    });

    it("return NaN, if only dividend is passed", function() {
      assert.deepEqual( getNearestDivisibleOf(200), NaN );
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

    context("returns NaN if dividend parameter is incorrect", function() {
      let testValues = [undefined, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns NaN, if dividend parameter equals to ${testValue}`, function() {
          assert.deepEqual( getNearestDivisibleOf(testValue, 60), NaN );
        });

      });
    });

    context("returns NaN if divisor parameter is incorrect", function() {
      let testValues = [undefined, null, Infinity, NaN, "text", "123text"];

      testValues.forEach(testValue => {

        it(`returns NaN, if divisor parameter equals to ${testValue}`, function() {
          assert.deepEqual( getNearestDivisibleOf(100, testValue), NaN );
        });

      });
    });

  });

});


describe("getPositionInPercentageOf", function() {
  let describeTest = template`position of ${0} between ${1} is ${"expectation"}`;
  let TestClass = makeTestClass(getPositionInPercentageOf, describeTest);

  describe("shall return position", function() {
    let funcOptions = [
      [ 100, [0, 500] ],
      [ 0, [0, 500] ],
      [ 500, [0, 500] ],
      [ 957, [0, 1000] ],
      [ 250, [200, 700] ],
      [ 0, [-500, 500] ],
      [ -200, [-500, 500] ],
      [ -50, [-500, 0] ],
      [ -350, [-500, -200] ],
    ];
    let expectations = ["20%", "0%", "100%", "95.7%", "10%", "50%", "30%", "90%", "50%"];

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall handle imprecise calculations", function() {
    let funcOptions = [
      [ 17, [0, 105] ],
      [ 1, [0, 3] ],
      [ 33, [0, 101] ],
      [ -17, [-105, 0] ],
      [ -1, [-2, 1] ],
    ];
    let expectations = ["16.19048%", "33.33333%", "32.67327%", "83.80952%", "33.33333%"];

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall return NaN, if value is out of range", function() {
    let funcOptions = [
      [ 100, [200, 700] ],
      [ 900, [200, 700] ],
      [ -300, [-200, 700] ],
      [ 300, [-700, -200] ],
      [ 0, [-700, -200] ],
    ];
    let expectations = new Array(funcOptions.length).fill(NaN);

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", function() {
    describe("returns NaN, if value parameter is incorrect", function() {
      let funcOptions = [
        [ undefined, [-500, 500] ],
        [ null, [-500, 500] ],
        [ Infinity, [-500, 500] ],
        [ NaN, [-500, 500] ],
        [ "text", [-500, 500] ],
        [ "123text", [-500, 500] ],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);

      let test = new TestClass();
      test.test(funcOptions, expectations);
    });

    describe("returns NaN, if range parameter is incorrect", function() {
      let funcOptions = [
        [ 50, [undefined, 500] ],
        [ 50, [null, 500] ],
        [ 50, [Infinity, 500] ],
        [ 50, [NaN, 500] ],
        [ 50, ["text", 500] ],
        [ 50, ["123text", 500] ],
      ];
      let expectations = new Array(funcOptions.length).fill(NaN);

      let test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });

});


describe("observerMixin", function() {

  describe("shall store list of subscribers", function() {
    let publisher = Object.assign({}, observerMixin);
    let subscriber1 = {};
    let subscriber2 = {};
    let subscribers = [subscriber1, subscriber2];

    publisher.subscribe("change", subscriber1);
    publisher.subscribe("change", subscriber2);

    subscribers.forEach( (subscriber, i) => {
      let publisherSubscriber = publisher._subscribers.change[i];

      it(`subscriber${i + 1} is in the list`, function() {
        assert.equal( subscriber, publisherSubscriber );
      });

    });
  });

  describe("shall remove subscribers from the list by request", function() {
    let publisher = Object.assign({}, observerMixin);
    let subscriber1 = {};
    let subscriber2 = {};
    let subscriber3 = {};
    let subscribers = [subscriber1, subscriber2, subscriber3];
    let cuttedSubscribers = [subscriber1, subscriber3];

    publisher.subscribe("change", subscriber1);
    publisher.subscribe("change", subscriber2);
    publisher.subscribe("change", subscriber3);

    let publisherSubscribers = publisher._subscribers.change;

    subscribers.forEach( (subscriber, i) => {
      let publisherSubscriber = publisher._subscribers.change[i];

      it(`subscriber${i + 1} is in the list`, function() {
        assert.equal( subscriber, publisherSubscriber );
      });

    });

    publisher.unsubscribe("change", subscriber2);

    it(`subscriber2 is removed from the list`, function() {
      assert.deepEqual( cuttedSubscribers, publisherSubscribers );
    });
  });

  describe("shall notify subscribers", function() {
    let publisher = Object.assign({}, observerMixin);
    let subscriber1 = {
      isNotified: false,
      update() {
        this.isNotified = true;
      }
    };
    let subscriber2 = {
      isNotified: false,
      update() {
        this.isNotified = true;
      }
    };
    let subscriber3 = {
      isNotified: false,
      update() {
        this.isNotified = true;
      }
    };
    let subscribers = [subscriber1, subscriber2, subscriber3];

    publisher.subscribe("change", subscriber1);
    publisher.subscribe("change", subscriber2);
    publisher.subscribe("change", subscriber3);

    let publisherSubscribers = publisher._subscribers.change;

    it(`subscribers are in the list`, function() {
      assert.deepEqual( subscribers, publisherSubscribers );
    });

    publisher.notify("change");

    it(`subscribers are notified`, function() {

      subscribers.forEach( (subscriber) => {
        assert.equal( subscriber.isNotified, true );
      });

    });
  });

});

/**
 * SliderUI Logic sketch:
 *  View logic
 *    shall display required quantity of handles
 *    shall restrict quantity of handles (!DomainModel)
 *    shall set step width relatively to Slider width (px)
 *    shall correct step, if there isn't enough space (Slider width)
 *    shall change orientation
 *    shall change orientation related props
 *      shall change position counting process when orientation is changed
 *      shall change tooltips position when orientation is changed
 *      shall change handle proportions when orientation is changed
 *      shall set default height when orientation is vertical
 *    shall treat tooltips
 *    shall have width (that is height, when horizontal)
 *    shall have state model
 *    shall display live value trough state model
 *  Controller logic
 *    shall listen to events on the handle
 *      when mouse is down — listen to a mouse move
 *      when mouse is moving
 *        call Model.setValues
 *        shall change position counting process when orientation is vertical
 *      when mouse is up — stop to listen to the mouse move
 *    shall listen to a click event on the base line
 *      call Model.setValues
 *    should listen to changing of #slider width
 *      should correct step value, if there isn't enough space (Slider width)
 */

describe("SliderUI", function() {
  // SliderUI Tests sketch:
  //  createBase method
  //    shall create line with according values
  //    shall set default height when orientation is vertical (css)
  //    shall set orientation css class (css)
  //  createHandles method
  //    shall create required quantity of handles
  //    shall set correct data-value attrs
  //    shall change handle proportions when orientation is vertical (css)
  //    shall create required quantity of tootips
  //    shall change tooltips position when orientation is vertical (css)
  //  setHandlePosition (handle, position)
  //    shall set position of handle

  describe("createBase function", function() {
    it("shall create base of the slider", function() {
      let base = createBase();

      assert.isNotNull(base);
      assert.isTrue( base.classList.contains("slider__base") );
    });
  });

  describe("createHandle function", function() {
    it("shall create handle", function() {
      let handle = createHandle();

      assert.isNotNull(handle);
      assert.isTrue( handle.classList.contains("slider__handle") );
    });
  });

  describe("createHandleGroup function", function() {
    it("shall create handleGroup", function() {
      let handleGroup = createHandleGroup();

      assert.isNotNull(handleGroup);
      assert.isTrue( handleGroup.classList.contains("slider__handle-group") );
    });

    it("shall set position of the handleGroup", function() {
      let position = "50%";
      let handleGroup = createHandleGroup(position);

      assert.equal(handleGroup.style.transform, "translate3d(50%, 0px, 0px)");
    });
  });

  describe("createTooltip function", function() {
    it("shall create tooltip", function() {
      let tooltip = createTooltip();

      assert.isNotNull(tooltip);
      assert.isTrue( tooltip.classList.contains("slider__tooltip") );
    });

    it("shall set textContent value", function() {
      let value = 100;

      let tooltip = createTooltip(value);

      assert.equal(tooltip.textContent, `${value}`);
    });
  });

  describe("setElemenPosition function", function() {
    it("shall set element position", function() {
      let element = document.createElement("div");

      setElementPosition(element, "50%");

      assert.equal(element.style.transform, "translate3d(50%, 0px, 0px)");
    });

    it("shall change element position", function() {
      let element = document.createElement("div");

      setElementPosition(element, "50%");
      assert.equal(element.style.transform, "translate3d(50%, 0px, 0px)");

      setElementPosition(element, "30%");
      assert.equal(element.style.transform, "translate3d(30%, 0px, 0px)");

      let element2 = setElementPosition(element, "20%");
      assert.equal(element2.style.transform, "translate3d(20%, 0px, 0px)");
    });
  });

  describe("composeHandleGroup", function() {
    context("shall append children", function() {
      let {handleGroup} = composeHandleGroup("70%", true, 100);

      it("shall contain 2 children", function(){
        assert.equal(handleGroup.children.length, 2);
      });

      it("shall append tooltip as a first child", function(){
        let isTooltipFirstChild = handleGroup.firstElementChild.classList.contains("slider__tooltip");

        assert.isTrue(isTooltipFirstChild);
      });

      it("shall append handle as a second child", function(){
        let isHandleSecondChild = handleGroup.lastElementChild.classList.contains("slider__handle");

        assert.isTrue(isHandleSecondChild);
      });
    });

    it(`shall create handle group without tooltip,
    when tooltipState is false`, function() {
      let {handleGroup} = composeHandleGroup("70%", false, 100);
      let isHandleFirstChild = handleGroup.firstElementChild.classList.contains("slider__handle");

      assert.equal(handleGroup.children.length, 1);
      assert.isTrue(isHandleFirstChild);
    });
  });

  describe("composeHandleGroups", function() {
    let positions = ["10%", "20%", "30%", "40%", "50%"];
    let values = [10, 20, 30, 40, 50];

    it(`shall return null for tooltips,
    if tooltipState is false`, function() {
      let {tooltips} = composeHandleGroups(positions, false, values);

      assert.isNull(tooltips);
    });

    context("shall return required quantity of elements", function() {
      let {handleGroups, handles, tooltips} = composeHandleGroups(positions, true, values);

      it("returns required quantity of handleGroups", function(){
        assert.equal(handleGroups.length, positions.length);
        assert.isFalse( handleGroups.includes(undefined) );
      });

      it("returns required quantity of handles", function(){
        assert.equal(handles.length, positions.length);
        assert.isFalse( handles.includes(undefined) );
      });

      it("returns required quantity of tooltips", function(){
        assert.equal(tooltips.length, positions.length);
        assert.isFalse( tooltips.includes(undefined) );
      });
    });
  });

  describe("updateHandlePositions function", function() {

    context("shall set position for each handle", function() {
      let positions = ["10%", "20%", "30%", "40%", "50%"];
      let handles = [];

      positions.forEach( (position) => {
        handles.push( createHandle() );
      });

      updateHandlePositions(handles, positions);

      handles.forEach( (handle, i) => {
        let position = positions[i];
        let handlePosition = handle.style.transform;

        it(`handle${i + 1} position equals to ${handlePosition}`, function() {
          assert.equal(handlePosition, `translate3d(${position}, 0px, 0px)`);
        });
      });
    });

  });

  describe("create method", function() {
    let div = document.createElement("div");
    let dataSourceMock = {
      options: {
        boundaries: [0, 100],
        values: [20, 40, 60],
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      },
      getValues() {
        return this.options;
      },
    };
    let subject = new SliderUI(div, dataSourceMock);

    it("shall create required quantity of handle-group", function() {
      assert.equal(div.firstElementChild.children.length, dataSourceMock.options.values.length);
    });
  });

});


describe("Model", function() {
  describe("shall organize access to the dataSource", function() {

    describe("changes values of the dataSource", function() {
      let newValues = {
        boundaries: [100, 500],
        step: 20,
        hasTooltips: true,
      };
      let expectations = {
        boundaries: [100, 500],
        values: 300,
        step: 20,
        orientation: "horizontal",
        hasTooltips: true,
      };
      let slider = new Slider();
      let model = new Model(slider);

      model.setValues(newValues);

      for (let key in expectations) {

        it(`${key} equals to ${expectations[key]}`, function() {
          assert.deepEqual( slider[key], expectations[key] );
        });

      }
    });

    describe("returns values of the dataSource", function() {
      let expectations = {
        boundaries: [0, 100],
        values: 50,
        step: 1,
        orientation: "horizontal",
        hasTooltips: false,
      };
      let slider = new Slider();
      let model = new Model(slider);

      let sliderValues = model.getValues();

      for (let key in expectations) {

        it(`${key} equals to ${expectations[key]}`, function() {
          assert.deepEqual( sliderValues[key], expectations[key] );
        });

      }
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
