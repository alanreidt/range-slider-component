import {getOverstepOf, getNearestDivisibleOf, isValueBetween, getNearestTo, getClosestFactorOf, observerMixin, getPositionInPercentageOf, setElementPosition, setElementsPosition } from "../src/utilities";
import {makeTestClass, test, testClass, template, simulateMouseEvent} from "./testUtilities";
import {Slider} from "../src/Slider";
import {Model} from "../src/Model";
import {initialization} from "./specs/initialization/initialization";
import {reassignment} from "./specs/reassignment/reassignment";
import {SliderUI} from "../src/SliderUI";


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

    describe("shall paint slider structure", function() {
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const model = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };
      let $parent;

      beforeEach(function() {
        $parent = document.createElement("div");
        new SliderUI($parent, model);
      });

      context("paint static structure correctly", function() {

        it(`create ${SLIDER_NAME} element`, function() {
          const slider = $parent.querySelector(`.${SLIDER_NAME}`);

          assert.isNotNull( slider );
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
      const model = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };

      it(`add ${SLIDER_ORIENTATION_FLAG} className, if orientation is vertical`, function() {
        const sliderUi = new SliderUI($parent, model);
        const sliderClassList = $parent.querySelector(`.${SLIDER_NAME}`).classList;

        assert.isTrue( sliderClassList.contains(`${SLIDER_ORIENTATION_FLAG}`) );
      });

      it("add nothing, if orientaion is horizontal", function() {
        Object.assign(options, {
          orientation: "horizontal",
        });
        const sliderUi = new SliderUI($parent, model);
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
      const model = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };

      it(`create ${SLIDER_TOOLTIP_NAME} element, if hasTooltips flag is true`, function() {
        const sliderUi = new SliderUI($parent, model);
        const sliderTooltips = $parent.querySelector(`.${SLIDER_TOOLTIP_NAME}`);

        assert.isNotNull( sliderTooltips );
      });

      it(`create nothing, if hasTooltips flag is false`, function() {
        Object.assign(options, {
          hasTooltips: false,
        });
        const sliderUi = new SliderUI($parent, model);
        const sliderTooltips = $parent.querySelector(`.${SLIDER_TOOLTIP_NAME}`);

        assert.isNull( sliderTooltips );
      });
    });


    context("shall repaint (refresh) slider structure", function() {
      const $parent = document.createElement("div");
      const options = {
        boundaries: [0, 100],
        values: [20, 80],
        step: 1,
        orientation: "vertical",
        hasTooltips: true,
      };
      const model = {
        _options: options,
        getOptions() {
          return this._options;
        }
      };
      const sliderUi = new SliderUI($parent, model);

      const $slider = $parent.querySelector(`.${SLIDER_NAME}`);

      it("slider and repainted slider (with the same values) are not equal", function() {
        const newSliderUi = new SliderUI($parent, model);

        const $newSlider = $parent.querySelector(`.${SLIDER_NAME}`);

        assert.notEqual($slider, $newSlider);
      });
    });

    describe("shall handle user actions (Controller)", function() {
      const $parent = document.createElement("div");
      document.body.append($parent);

      describe("shall listen to events on $base element", function() {
        context("trigger model update method on mousedown event", function() {
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
            const model = {
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

            new SliderUI($parent, model);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

            $slider.style.width = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $base, {clientX: mousePositionValue});

            it(`model update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(model.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, model._options.values);
            });
          });
        });

        context(`trigger model update method on mousedown event,
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
            const model = {
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

            new SliderUI($parent, model);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

            $slider.style.height = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $base, {clientY: mousePositionValue});

            it(`model update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(model.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, model._options.values);
            });
          });
        });

        $parent.innerHTML = '';
      });

      describe("shall listen to events on $handleGroup element", function() {
        context("trigger model update method on mousemove during mousedown event", function() {
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
            const model = {
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

            new SliderUI($parent, model);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

            $slider.style.width = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $handleGroup);
            simulateMouseEvent("mousemove", document, {clientX: mousePositionValue});
            simulateMouseEvent("mouseup", document);

            it(`model update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(model.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, model._options.values);
            });
          });
        });

        context(`trigger model update method on mousedown event,
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
            const model = {
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

            new SliderUI($parent, model);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

            $slider.style.height = "200px";

            const expectationValue = expectationValues[i];

            simulateMouseEvent("mousedown", $handleGroup);
            simulateMouseEvent("mousemove", document, {clientY: mousePositionValue});
            simulateMouseEvent("mouseup", document);


            it(`model update is triggered on mouse event ${i + 1}`, function() {
              assert.isTrue(model.isTriggered);
            });

            it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, function() {
              assert.deepEqual(expectationValue, model._options.values);
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
          const model = {
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

          new SliderUI($parent, model);

          const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
          const $handleGroup = $parent.querySelector(`.${SLIDER_HANDLE_GROUP_NAME}`);

          $slider.style.height = "200px";

          const modelValues = model._options.values.slice();

          simulateMouseEvent("mousedown", $handleGroup);
          simulateMouseEvent("mouseup", document);
          simulateMouseEvent("mousemove", document, {clientY: 100});

          it(`model update is not triggered on mouse event`, function() {
            assert.isFalse(model.isTriggered);
          });

          it(`model values are equal to ${modelValues}`, function() {
            assert.deepEqual(modelValues, model._options.values);
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
    const model = {
      _options: options,
      getOptions() {
        return this._options;
      }
    };
    const sliderUi = new SliderUI($parent, model);

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


describe("Model", function() {
  describe("shall organize access to the dataSource", function() {

    describe("update values of the dataSource", function() {
      let newValues = {
        boundaries: [100, 500],
        step: 20,
        hasTooltips: true,
      };
      let expectations = {
        boundaries: [100, 500],
        values: [300],
        step: 20,
        orientation: "horizontal",
        hasTooltips: true,
      };
      let slider = new Slider();
      let model = new Model(slider);

      model.update(newValues);

      for (let key in expectations) {

        it(`${key} equals to ${expectations[key]}`, function() {
          assert.deepEqual( slider[key], expectations[key] );
        });

      }
    });

    describe("returns values of the dataSource", function() {
      let expectations = {
        boundaries: [0, 100],
        values: [50],
        step: 1,
        orientation: "horizontal",
        hasTooltips: false,
      };
      let slider = new Slider();
      let model = new Model(slider);

      let sliderValues = model.getOptions();

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
