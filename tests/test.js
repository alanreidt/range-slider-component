import {
  getOverstepOf,
  getNearestDivisibleOf,
  isValueBetween,
  getNearestTo,
  getPositionInPercentageOf,
  setElementPosition,
  setElementsPosition,
  translateProportionIntoValue
} from "../src/utilities/utilities.js";
import { observerMixin } from "../src/utilities/observerMixin";
import { makeTestClass, test, testClass, template, simulateMouseEvent } from "./testUtilities";
import { SliderModel } from "../src/SliderModel";
import { SliderAdapter } from "../src/SliderAdapter";
import { SliderUI } from "../src/SliderUI";
import { slider } from "../src/slider.js";
import { testGetClosestFactorOf } from "../src/utilities/getClosestFactorOf/getClosestFactorOf.test";

testGetClosestFactorOf();

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


describe("translateProportionIntoValue", function() {
  let describeTest = template`proportion of ${0} between ${1} is ${"expectation"}`;
  let TestClass = makeTestClass(translateProportionIntoValue, describeTest);

  describe("shall return value", function() {
    let funcOptions = [
      [ 20, [0, 500] ],
      [ 0, [0, 500] ],
      [ 100, [0, 500] ],
      [ 95.7, [0, 1000] ],
      [ 10, [200, 700] ],
      [ 50, [-500, 500] ],
      [ 30, [-500, 500] ],
      [ 90, [-500, 0] ],
      [ 50, [-500, -200] ],
    ];
    let expectations = [100, 0, 500, 957, 250, 0, -200, -50, -350];

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall handle imprecise calculations", function() {
    let funcOptions = [
      [ 16.19048, [0, 105] ],
      [ 33.33333, [0, 3] ],
      [ 32.67327, [0, 101] ],
      [ 83.80952, [-105, 0] ],
      [ 33.33333, [-2, 1] ],
    ];
    let expectations = [17, 1, 33, -17, -1];

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall return NaN, if (0 > proportion > 100) is out of range", function() {
    let funcOptions = [
      [ 101, [200, 700] ],
      [ 200, [200, 700] ],
      [ -1, [200, 700] ],
      [ -100, [200, 700] ],
    ];
    let expectations = new Array(funcOptions.length).fill(NaN);

    let test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", function() {
    describe("returns NaN, if proportion parameter is incorrect", function() {
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

    publisher.addSubscriber("change", subscriber1);
    publisher.addSubscriber("change", subscriber2);

    subscribers.forEach( (subscriber, i) => {
      let publisherSubscriber = publisher._eventSubscribers.change[i];

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

    publisher.addSubscriber("change", subscriber1);
    publisher.addSubscriber("change", subscriber2);
    publisher.addSubscriber("change", subscriber3);

    let publisherSubscribers = publisher._eventSubscribers.change;

    subscribers.forEach( (subscriber, i) => {
      let publisherSubscriber = publisher._eventSubscribers.change[i];

      it(`subscriber${i + 1} is in the list`, function() {
        assert.equal( subscriber, publisherSubscriber );
      });

    });

    publisher.removeSubscriber("change", subscriber2);

    it(`subscriber2 is removed from the list`, function() {
      assert.deepEqual( cuttedSubscribers, publisherSubscribers );
    });
  });

  describe("shall trigger subscribers", function() {
    const publisher = Object.assign({}, observerMixin);
    const subscribers = [];

    for (let i = 0; i < 3; i++) {

      subscribers.push({
        isNotified: false,
        update(value) {
          this.isNotified = true;
          this.value = value;
        }
      });

    }

    const subscriberHandlers = subscribers.map(
      (subscriber) => subscriber.update.bind(subscriber)
    );

    subscriberHandlers.forEach(
      (subscriberHandler) => publisher.addSubscriber( "change", subscriberHandler )
    );

    const publisherSubscribers = publisher._eventSubscribers.change;

    it(`subscribers are in the list`, function() {
      assert.deepEqual( subscriberHandlers, publisherSubscribers );
    });

    publisher.triggerSubscribers("change", "Hello");

    context(`subscribers are notified`, function() {

      subscribers.forEach( (subscriber, i) => {
        it(`subscriber${i + 1} is notified`, function() {
          assert.isTrue(subscriber.isNotified);
        });
      });

    });

    context(`value is accepted`, function() {

      subscribers.forEach( (subscriber, i) => {
        it(`subscriber${i + 1} has value`, function() {
          assert.equal(subscriber.value, "Hello");
        });
      });

    });
  });

});


describe("setElemenPosition function", function() {

  it("shall set element position", function() {
    const element = document.createElement("div");
    const position = "50%";
    const regexp = new RegExp(`${position}`);

    setElementPosition(element, position);

    const elementStyle = element.getAttribute("style");

    assert.isNotNull( elementStyle.match(regexp) );
  });

  context("shall change element position", function() {
    const element = document.createElement("div");
    const positions = ["50%", "30%", "20%"];

    positions.forEach( (position) => {
      const regexp = new RegExp(`${position}`);

      setElementPosition(element, position);

      const elementStyle = element.getAttribute("style");

      it(`element position is changed to ${position}`, function() {
        assert.isNotNull( elementStyle.match(regexp) );
      });
    });
  });

});


describe("setElementsPosition function", function() {

  context("shall set position for each handle", function() {
    let positions = ["10%", "20%", "30%", "40%", "50%"];
    let divs = [];

    positions.forEach( () => {
      divs.push( document.createElement("div") );
    });

    setElementsPosition(divs, positions);

    divs.forEach( (div, i) => {
      let position = positions[i];
      let divStyle = div.getAttribute("style");
      let regexp = new RegExp(`${position}`);

      it(`div${i + 1} position equals to ${position}`, function() {
        assert.isNotNull( divStyle.match(regexp) );
      });
    });
  });
});


describe("SliderUI", function() {
  const SLIDER_NAME = "slider";
  const SLIDER_BASE_NAME = "slider__base";
  const SLIDER_ORIENTATION_FLAG = "slider_vertical";
  const SLIDER_HANDLE_GROUP_NAME = "slider__handle-group";
  const SLIDER_TOOLTIP_NAME = "slider__tooltip";
  const SLIDER_HANDLE_NAME = "slider__handle";

  describe("constructor", function() {

    describe("shall paint $slider structure", function() {
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const sliderAdapter = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };
      let $parent;

      beforeEach(function() {
        $parent = document.createElement("div");
        new SliderUI($parent, sliderAdapter);
      });

      context("paint static structure correctly", function() {

        it(`create ${SLIDER_NAME} element`, function() {
          const $slider = $parent.querySelector(`.${SLIDER_NAME}`);

          assert.isNotNull( $slider );
        });

        it(`create ${SLIDER_BASE_NAME} element`, function() {
          const sliderBase = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

          assert.isNotNull( sliderBase );
        });
      });

      context("paint dynamic structure correctly", function() {
        const requiredQuantity = options.values.length;

        it(`create ${requiredQuantity} ${SLIDER_HANDLE_GROUP_NAME} elements`, function() {
          const handleGroups = $parent.querySelectorAll(`.${SLIDER_HANDLE_GROUP_NAME}`);

          assert.equal(requiredQuantity, handleGroups.length);
        });

        it(`create ${requiredQuantity} ${SLIDER_TOOLTIP_NAME} elements`, function() {
          const tooltips = $parent.querySelectorAll(`.${SLIDER_TOOLTIP_NAME}`);

          assert.equal(requiredQuantity, tooltips.length);
        });

        it(`create ${requiredQuantity} ${SLIDER_HANDLE_NAME} elements`, function() {
          const handles = $parent.querySelectorAll(`.${SLIDER_HANDLE_NAME}`);

          assert.equal(requiredQuantity, handles.length);
        });
      });
    });

    describe(`shall add ${SLIDER_ORIENTATION_FLAG}, when needed`, function() {
      const $parent = document.createElement("div");
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const sliderAdapter = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };

      it(`add ${SLIDER_ORIENTATION_FLAG} className, if orientation is vertical`, function() {
        const sliderUi = new SliderUI($parent, sliderAdapter);
        const sliderClassList = $parent.querySelector(`.${SLIDER_NAME}`).classList;

        assert.isTrue( sliderClassList.contains(`${SLIDER_ORIENTATION_FLAG}`) );
      });

      it("add nothing, if orientaion is horizontal", function() {
        Object.assign(options, {
          orientation: "horizontal",
        });
        const sliderUi = new SliderUI($parent, sliderAdapter);
        const sliderClassList = $parent.querySelector(`.${SLIDER_NAME}`).classList;

        assert.isFalse( sliderClassList.contains(`${SLIDER_ORIENTATION_FLAG}`) );
      });
    });

    describe(`shall create ${SLIDER_TOOLTIP_NAME} element, when needed`, function() {
      const $parent = document.createElement("div");
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const sliderAdapter = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };

      it(`create ${SLIDER_TOOLTIP_NAME} element, if hasTooltips flag is true`, function() {
        const sliderUi = new SliderUI($parent, sliderAdapter);
        const sliderTooltips = $parent.querySelector(`.${SLIDER_TOOLTIP_NAME}`);

        assert.isNotNull( sliderTooltips );
      });

      it(`create nothing, if hasTooltips flag is false`, function() {
        Object.assign(options, {
          hasTooltips: false,
        });
        const sliderUi = new SliderUI($parent, sliderAdapter);
        const sliderTooltips = $parent.querySelector(`.${SLIDER_TOOLTIP_NAME}`);

        assert.isNull( sliderTooltips );
      });
    });


    context("shall repaint (refresh) $slider structure", function() {
      const $parent = document.createElement("div");
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const sliderAdapter = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };
      const sliderUi = new SliderUI($parent, sliderAdapter);

      const $slider = $parent.querySelector(`.${SLIDER_NAME}`);

      it("$slider and repainted $slider (with the same values) are not equal", function() {
        const newSliderUi = new SliderUI($parent, sliderAdapter);

        const $newSlider = $parent.querySelector(`.${SLIDER_NAME}`);

        assert.notEqual($slider, $newSlider);
      });
    });


    describe("shall handle user actions (Controller)", function() {
      const $parent = document.createElement("div");
      document.body.append($parent);

      describe("shall listen to events on $base element", function() {
        context("trigger sliderAdapter update method on mousedown event", function() {
          const mousePositionValues = [20, 100, 200];
          const expectationValues = [10, 50, 100];

          mousePositionValues.forEach( (mousePositionValue, i) => {
            const options = {
              boundaries: [0, 100],
              values: [20, 80],
              step: 1,
              orientation: "horizontal",
              hasTooltips: true,
            };
            const sliderAdapter = {
              _options: options,
              isTriggered: false,

              getOptions() {
                return this._options;
              },

              update(newOptions) {
                this.isTriggered = true;
                this._options = {
                  ...options,
                  ...newOptions,
                };
              },
            };

            new SliderUI($parent, sliderAdapter);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

            $slider.style.width = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $base, {clientX: mousePositionValue});
            simulateMouseEvent("mouseup", $base);

            it(`sliderAdapter update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(sliderAdapter.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, sliderAdapter._options.values);
            });
          });
        });

        context(`trigger sliderAdapter update method on mousedown event,
        when slider is vertical`, function() {
          const mousePositionValues = [20, 100, 200];
          const expectationValues = [10, 50, 100];

          mousePositionValues.forEach( (mousePositionValue, i) => {
            const options = {
              boundaries: [0, 100],
              values: [20, 80],
              step: 1,
              orientation: "vertical",
              hasTooltips: true,
            };
            const sliderAdapter = {
              _options: options,
              isTriggered: false,

              getOptions() {
                return this._options;
              },

              update(newOptions) {
                this.isTriggered = true;
                this._options = {
                  ...options,
                  ...newOptions,
                };
              },
            };

            new SliderUI($parent, sliderAdapter);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

            $slider.style.height = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $base, {clientY: mousePositionValue});
            simulateMouseEvent("mouseup", $base);

            it(`sliderAdapter update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(sliderAdapter.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, sliderAdapter._options.values);
            });
          });
        });

        $parent.innerHTML = '';
      });

      describe("shall listen to events on $handleGroup element", function() {
        context("trigger sliderAdapter update method on mousemove during mousedown event", function() {
          const mousePositionValues = [20, 100, 200];
          const expectationValues = [
            [10, 80],
            [50, 80],
            [100, 80],
          ];

          mousePositionValues.forEach( (mousePositionValue, i) => {
            const options = {
              boundaries: [0, 100],
              values: [20, 80],
              step: 1,
              orientation: "horizontal",
              hasTooltips: true,
            };
            const sliderAdapter = {
              _options: options,
              isTriggered: false,

              getOptions() {
                return this._options;
              },

              update(newOptions) {
                this.isTriggered = true;
                this._options = {
                  ...options,
                  ...newOptions,
                };
              },
            };

            new SliderUI($parent, sliderAdapter);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

            $slider.style.width = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $handleGroup);
            simulateMouseEvent("mousemove", document, {clientX: mousePositionValue});
            simulateMouseEvent("mouseup", document);

            it(`sliderAdapter update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(sliderAdapter.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, sliderAdapter._options.values);
            });
          });
        });

        context(`trigger sliderAdapter update method on mousedown event,
        when slider is vertical`, function() {
          const mousePositionValues = [20, 100, 200];
          const expectationValues = [
            [10, 80],
            [50, 80],
            [100, 80],
          ];

          mousePositionValues.forEach( (mousePositionValue, i) => {
            const options = {
              boundaries: [0, 100],
              values: [20, 80],
              step: 1,
              orientation: "vertical",
              hasTooltips: true,
            };
            const sliderAdapter = {
              _options: options,
              isTriggered: false,

              getOptions() {
                return this._options;
              },

              update(newOptions) {
                this.isTriggered = true;
                this._options = {
                  ...options,
                  ...newOptions,
                };
              },
            };

            new SliderUI($parent, sliderAdapter);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

            $slider.style.height = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $handleGroup);
            simulateMouseEvent("mousemove", document, {clientY: mousePositionValue});
            simulateMouseEvent("mouseup", document);


            it(`sliderAdapter update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(sliderAdapter.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, sliderAdapter._options.values);
            });
          });
        });

        context("remove listeners on mouseup after mousedown event", function() {
          const options = {
            boundaries: [0, 100],
            values: [20, 80],
            step: 1,
            orientation: "vertical",
            hasTooltips: true,
          };
          const sliderAdapter = {
            _options: options,
            isTriggered: false,

            getOptions() {
              return this._options;
            },

            update(newOptions) {
              this.isTriggered = true;
              this._options = {
                ...options,
                ...newOptions,
              };
            },
          };

          new SliderUI($parent, sliderAdapter);

          const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
          const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

          $slider.style.height = "200px";

          const modelValues = sliderAdapter._options.values.slice();

          simulateMouseEvent("mousedown", $handleGroup);
          simulateMouseEvent("mouseup", document);
          simulateMouseEvent("mousemove", document, {clientY: 100});

          it(`sliderAdapter update is not triggered on mouse event`, function() {
            assert.isFalse(sliderAdapter.isTriggered);
          });

          it(`sliderAdapter values are equal to ${modelValues}`, function() {
            assert.deepEqual(modelValues, sliderAdapter._options.values);
          });
        });

        $parent.innerHTML = '';
      });

    });

  });


  describe("update method", function() {
    const $parent = document.createElement("div");
    const options = {
      boundaries: [0, 100],
      values: [20, 80],
      step: 1,
      orientation: "vertical",
      hasTooltips: true,
    };
    const sliderAdapter = {
      _options: options,
      getOptions() {
        return this._options;
      }
    };
    const sliderUi = new SliderUI($parent, sliderAdapter);

    describe("shall set values", function() {

      context(`${SLIDER_HANDLE_GROUP_NAME}s are set`, function() {
        const handleGroups = Array.from( $parent.querySelectorAll(`.${SLIDER_HANDLE_GROUP_NAME}`) );

        handleGroups.forEach( (handleGroup, i) => {
          const value = options.values[i];
          const regexp = new RegExp(`${value}`);
          const handleGroupStyle = handleGroup.getAttribute("style");

          it(`${SLIDER_HANDLE_GROUP_NAME}${i + 1} equals to ${value}`, function() {
            assert.isNotNull( handleGroupStyle.match(regexp) );
          });
        });
      });

    });

    describe("shall update values", function() {
      const newValues = [10, 60];

      sliderUi.update({
        boundaries: [0, 100],
        values: newValues,
      });

      context(`${SLIDER_HANDLE_GROUP_NAME}s are updated`, function() {
        const handleGroups = Array.from( $parent.querySelectorAll(`.${SLIDER_HANDLE_GROUP_NAME}`) );

        handleGroups.forEach( (handleGroup, i) => {
          const value = newValues[i];
          const regexp = new RegExp(`${value}`);
          const handleGroupStyle = handleGroup.getAttribute("style");

          it(`${SLIDER_HANDLE_GROUP_NAME}${i + 1} equals to ${value}`, function() {
            assert.isNotNull( handleGroupStyle.match(regexp) );
          });
        });
      });
    });

  });

});


describe("SliderAdapter", function() {
  describe("shall organize access to the dataSource", function() {

    describe("update values of the dataSource", function() {
      const newValues = {
        boundaries: [100, 500],
        step: 20,
        hasTooltips: true,
      };
      const sliderModel = {
        setValues(newOptions) {
          this.options = newOptions;
        },
      };
      const sliderAdapter = new SliderAdapter(sliderModel);

      sliderAdapter.update(newValues);

      for (let key in newValues) {

        it(`${key} equals to ${newValues[key]}`, function() {
          assert.deepEqual( sliderModel.options[key], newValues[key] );
        });

      }
    });

    describe("returns values of the dataSource", function() {
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "horizontal",
        hasTooltips: true,
      };
      const expectations = options;
      const sliderModel = {
        options: options,

        getValues() {
          return this.options;
        },
      };
      const sliderAdapter = new SliderAdapter(sliderModel);

      const sliderOptions = sliderAdapter.getOptions();

      for (let key in expectations) {

        it(`${key} equals to ${expectations[key]}`, function() {
          assert.deepEqual( sliderOptions[key], expectations[key] );
        });

      }
    });

  });
});


describe("SliderModel", function() {

  describe("Initialization test", function() {
    const Class = SliderModel;
    const methodGetter = "getValues";

    const runTest = testClass({Class, methodGetter});

    describe("shall assign default values for unpassed parameters", function () {

      context("shall assign default values, if nothing is passed", function() {
        const expectations = [{
          boundaries: [0, 100],
          values: [50],
          step: 1,
          orientation: "horizontal",
          hasTooltips: false,
        }];
        const testOptions = {expectations};

        runTest(testOptions);
      });

      context("shall assign default values for unpassed parameters, if only part is passed", function() {
        const ClassOptions = {
          boundaries: [5000, 40000],
          values: 20000,
          step: 50,
          orientation: "vertical",
        };
        const expectations = [{
          boundaries: [5000, 40000],
          values: [20000],
          step: 50,
          orientation: "vertical",
          hasTooltips: false,
        }];
        const testOptions = {ClassOptions, expectations};

        runTest(testOptions);
      });

    });


    describe("shall assign fixed values for incorrect arguments", function() {

      context("shall assign default value if incorrect one is passed", function() {
        const ClassOptions = {
          boundaries: ["hundred", 200],
          values: [25, "p100"],
          step: -20,
          orientation: "right",
          hasTooltips: 7,
        };
        const expectations = [{
          boundaries: [0, 200],
          values: [25],
          step: 1,
          orientation: "horizontal",
          hasTooltips: false,
        }];
        const testOptions = {ClassOptions, expectations};

        runTest(testOptions);
      });

      context("shall parse number from mixed inputs", function() {
        const ClassOptions = {
          boundaries: [0, "1000px"],
          values: ["0$", 600],
          step: "100",
        };
        const expectations = [{
          boundaries: [0, 1000],
          values: [0, 600],
          step: 100,
          orientation: "horizontal",
          hasTooltips: false,
        }];
        const testOptions = {ClassOptions, expectations};

        runTest(testOptions);
      });

    });


    describe(`shall accept array of {value} values`, function() {

      it(`shall limit array of {value} to 8 values`);

      context(`shall accept array of {value} values`, function() {
        const ClassOptions = {
          boundaries: [100, 500],
          values: [100, 200, 300, 460],
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const expectations = [
          { values: [100, 200, 300, 460] },
        ];
        const testOptions = {ClassOptions, expectations};

        runTest(testOptions);
      });

      context(`shall accept array of {value} values and correct incorrect`, function() {
        const ClassOptions = {
          boundaries: [100, 500],
          values: [100, 200, 300, "Ben", 460, false],
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const expectations = [
          { values: [100, 200, 300, 460] },
        ];
        const testOptions = {ClassOptions, expectations};

        runTest(testOptions);
      });

    });


    describe("{value} shall be equal to average of {boundaries} by default", function() {
      const ClassOptions = {
        boundaries: [100, 500],
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const expectations = [
        { values: [300] },
      ];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

  });

  describe("Reassignment test", function() {
    const Class = SliderModel;
    const method = "setValues";
    const methodGetter = "getValues";

    const runTest = testClass({Class, method, methodGetter});

    describe("shall change values, if correct one is passed", function() {
      let options = [{
        boundaries: [100, 500],
        values: 180,
        step: 20,
      }];
      let expectations = [{
        ...options[0],
        values: [180]
      }];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });


    describe("shall not change values, if incorrect one is passed", function() {
      let options = [{
        boundaries: [true, false],
        values: false,
        step: "two",
      }];
      let expectations = [{
        boundaries: [0, 100],
        values: [50],
        step: 1,
        orientation: "horizontal",
        hasTooltips: false,
      }];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });


    describe("shall correct values", function() {

      context(`shall correct {value},
      if passed value isn't correspond to {step}`, function() {
        let options = [
          {boundaries: [0, 500], step: 100, values: 190},
          {boundaries: [-500, 500], step: 250, values: -100},
          {boundaries: [-1000, -500], step: 50, values: -525},
        ];
        let expectations = [
          { values: [200] },
          { values: [0] },
          { values: [-500] },
        ];
        let testOptions = {options, expectations};

        runTest(testOptions);
      });

      context(`shall correct {value},
      if passed value is out of {boundaries}`, function() {
        let options = [
          {boundaries: [0, 500], values: 1000},
          {boundaries: [-500, 500], values: -1000},
          {boundaries: [-500, 500], values: [-1000, 1000]},
          {boundaries: [-500, 500], values: [-1000, 250, 1000]},
          {boundaries: [-500, 500], values: [-2000, -1000, 250, 1000, 2000]},
          {boundaries: [-500, 500], values: [250, -2000, 1000, 2000, -1000]},
        ];
        let expectations = [
          { boundaries: [0, 500], values: [500] },
          { boundaries: [-500, 500], values: [-500] },
          { boundaries: [-500, 500], values: [-500, 500] },
          { boundaries: [-500, 500], values: [-500, 250, 500] },
          { boundaries: [-500, 500], values: [-500, 250, 500] },
          { boundaries: [-500, 500], values: [-500, 250, 500] },
        ];
        let testOptions = {options, expectations};

        runTest(testOptions);
      });

      context(`shall correct {step},
      if passed value isn't correspond to {boundaries(range)}`, function() {
        let options = [
          {boundaries: [0, 100], step: 15},
          {boundaries: [0, 300], step: 250},
          {boundaries: [-500, 500], step: 105},
        ];
        let expectations = [
          {boundaries: [0, 100], step: 20},
          {boundaries: [0, 300], step: 300},
          {boundaries: [-500, 500], step: 100},
        ];
        let testOptions = {options, expectations};

        runTest(testOptions);
      });

      context(`shall correct {step},
      if passed value is bigger than difference of {boundaries(range)}`, function() {
        let options = [
          {step: 200},
          {boundaries: [300, 900], step: 1000},
          {boundaries: [-500, 500], step: 2000},
        ];
        let expectations = [
          {step: 100},
          {boundaries: [300, 900], step: 600},
          {boundaries: [-500, 500], step: 1000},
        ];
        let testOptions = {options, expectations};

        runTest(testOptions);
      });

      context(`{boundaries} on change, shall correct {value},
      if it became out of the range`, function() {
        let options = [
          { boundaries: [200, 500] },
          { boundaries: [-500, -200] },
        ];
        let expectations = [
          { boundaries: [200, 500], values: [200] },
          { boundaries: [-500, -200], values: [-200] },
        ];
        let ClassOptions = {
          values: 100,
        };
        let testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });

      context(`{boundaries} on change, shall correct {step},
      if it stopped to correspond to the range`, function() {
        let options = [
          { boundaries: [0, 90] },
          { boundaries: [-50, 0] },
        ];
        let expectations = [
          {boundaries: [0, 90], step: 18},
          {boundaries: [-50, 0], step: 25},
        ];
        let ClassOptions = {
          step: 20,
        };
        let testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });

      context(`{boundaries} on change shall correct {step}, if it became bigger,
      than difference of {boundaries(range)}`, function() {
        let options = [
          { boundaries: [0, 90] },
          { boundaries: [-50, 0] },
        ];
        let expectations = [
          {boundaries: [0, 90], step: 90},
          {boundaries: [-50, 0], step: 50},
        ];
        let ClassOptions = {
          step: 100,
        };
        let testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });

      context(`{step} on change, shall correct {value},
      if it stopped to correspond to its value`, function() {
        let options = [
          { step: 20 },
          { step: 50 },
        ];
        let expectations = [
          { step: 20, values: [80] },
          { step: 50, values: [50] },
        ];
        let ClassOptions = {
          values: 70,
        };
        let testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });

    });


    describe("shall restrict values after initialization", function() {

      describe("restrict {values} quantity (length) after initialization", function() {
        context("restrict default {values} quantity (length)", function() {
          const options = [
            { values: 30 },
            { values: [50, 90] },
            { values: [60, 70, 90] },
          ];
          const expectations = [
            { values: [30] },
            { values: [50] },
            { values: [60] },
          ];
          const testOptions = {options, expectations};

          runTest(testOptions);
        });

        describe("restrict changed {values} quantity (length)", function() {
          context("preserve single value", function() {
            const ClassOptions = {
              values: 20,
            };
            const options = [
              { values: 30 },
              { values: [50, 90] },
              { values: [60, 70, 90] },
            ];
            const expectations = [
              { values: [30] },
              { values: [50] },
              { values: [60] },
            ];
            const testOptions = {ClassOptions, options, expectations};

            runTest(testOptions);
          });

          context("preserve 2 values", function() {
            const ClassOptions = {
              values: [20, 80],
            };
            const options = [
              { values: 30 },
              { values: [30, 90] },
              { values: [30, 50, 90] },
            ];
            const expectations = [
              { values: [30, 80] },
              { values: [30, 90] },
              { values: [30, 50] },
            ];
            const testOptions = {ClassOptions, options, expectations};

            runTest(testOptions);
          });
        });
      });

    });


    describe(`shall change nearest {boundaries} value,
    if only a number is passed`, function() {

      context(`shall change {boundaries(min)},
      if passed value lay near to it`, function() {
        const ClassOptions = {
          boundaries: [100, 500],
          values: 180,
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const options = [
          { boundaries: 0 },
        ];
        const expectations = [
          { boundaries: [0, 500] },
        ];
        const testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });

      context(`shall change {boundaries(max)},
      if passed value lay near to it`, function() {
        const ClassOptions = {
          boundaries: [100, 500],
          values: 180,
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const options = [
          { boundaries: 400 },
        ];
        const expectations = [
          { boundaries: [100, 400] },
        ];
        const testOptions = {ClassOptions, options, expectations};

        runTest(testOptions);
      });
    });

  });

});


describe("slider", function() {
  const sliderModel = {
    arguments: null,
  };
  const sliderAdapter = {
    arguments: null,
    addSubscriberArgs: null,

    getOptions() {
      return options;
    },

    update(options) {
      this.optionsUpdated = options;
    },

    addSubscriber(...args) {
      this.addSubscriberArgs = args;
    },
  };
  const sliderUi = {
    arguments: null,

    update() {},
  };

  const makeClassMock = function(obj) {
    return (...options) => {
      obj.arguments = options;
      return obj;
    };
  };

  const factory = {
    createModel: makeClassMock(sliderModel),
    createAdapter: makeClassMock(sliderAdapter),
    createUI: makeClassMock(sliderUi),
  };

  const $parent = document.createElement("div");
  const options = {
    boundaries: [100, 500],
    values: [200, 300],
    step: 20,
    orientaion: "horizontal",
    hasTooltips: true,
  };

  slider._factory = factory;
  slider.create($parent, options);

  describe("create method", function() {
    context("shall create sliderModel with options", function() {
      it("sliderModel arguments is not equal to null", function() {
        assert.isNotNull( sliderModel.arguments );
      });

      it("sliderModel argument is equal to options", function() {
        assert.equal(sliderModel.arguments[0], options);
      });
    });

    context("shall create sliderAdapter with sliderModel, as dataSource", function() {
      it("sliderAdapter arguments is not equal to null", function() {
        assert.isNotNull( sliderAdapter.arguments );
      });

      it("sliderAdapter arguments[0] is equal to sliderModel", function() {
        assert.equal(sliderAdapter.arguments[0], sliderModel);
      });
    });

    context("shall create sliderUi with $parent and sliderAdapter", function() {
      it("sliderUi arguments is not equal to null", function() {
        assert.isNotNull( sliderUi.arguments );
      });

      it("sliderUi arguments[0] is equal to $parent", function() {
        assert.equal(sliderUi.arguments[0], $parent);
      });

      it("sliderUi arguments[1] is equal to sliderAdapter", function() {
        assert.equal(sliderUi.arguments[1], sliderAdapter);
      });
    });

    context("shall subscribe sliderUI update method to sliderAdapter", function() {
      it("sliderAdapter addSubscriberArgs is not equal to null", function() {
        assert.isNotNull( sliderAdapter.addSubscriberArgs );
      });

      it("sliderAdapter addSubscriberArgs[0] is equal to 'update'", function() {
        assert.equal(sliderAdapter.addSubscriberArgs[0], "update");
      });

      it("sliderAdapter addSubscriberArgs[1] is equal to sliderUi update method", function() {
        assert.equal(sliderAdapter.addSubscriberArgs[1], sliderUi.update);
      });
    });

    context("shall create parentsMap with sliderModel, sliderAdapter and sliderUi", function() {
      it("sliderAPI parentsMap length is not equal to 0", function() {
        assert.notEqual( slider._parentsMap.length, 0 );
      });

      it("sliderAPI parentsMap $parent is not undefined", function() {
        assert.notEqual( slider._parentsMap.get($parent), undefined );
      });

      it("sliderAPI parentsMap $parent sliderModel is equal to sliderModel", function() {
        assert.equal( slider._parentsMap.get($parent).sliderModel, sliderModel );
      });

      it("sliderAPI parentsMap $parent sliderAdapter is equal to sliderAdapter", function() {
        assert.equal( slider._parentsMap.get($parent).sliderAdapter, sliderAdapter );
      });

      it("sliderAPI parentsMap $parent sliderUi is equal to sliderUi", function() {
        assert.equal( slider._parentsMap.get($parent).sliderUi, sliderUi );
      });
    });
  });

  describe("getOptions method", function() {
    context("shall return current options", function() {

      it("returned options are equal to passed options", function() {
        assert.equal(slider.getOptions($parent), options);
      });

    });
  });

  describe("setOptions method", function() {
    context("shall set sliderAdapter optionsUpdated property", function() {
      const newOptions = {
        boundaries: [0, 100],
        step: 20,
      };

      slider.setOptions($parent, newOptions);

      it("sliderAdapter optionsUpdated is not equal to null", function() {
        assert.isNotNull( sliderAdapter.optionsUpdated );
      });

      it("sliderAdapter optionsUpdated is equal to newOptions", function() {
        assert.equal(sliderAdapter.optionsUpdated, newOptions);
      });

    });
  });

});
