import {
  setElementPosition,
  setElementsPosition} from "../src/utilities/utilities.js";
import { testClass, simulateMouseEvent } from "./testUtilities";
import { SliderModel } from "../src/SliderModel";
import { SliderAdapter } from "../src/SliderAdapter";
import { SliderUI } from "../src/SliderUI";
import { slider } from "../src/slider.js";
import { testGetClosestFactorOf } from "../src/utilities/getClosestFactorOf/getClosestFactorOf.test";
import { testGetNearestTo } from "../src/utilities/getNearestTo/getNearestTo.test.js";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test.js";
import { testGetOverstepOf } from "../src/utilities/getOverstepOf/getOverstepOf.test.js";
import { testGetNearestDivisibleOf } from "../src/utilities/getNearestDivisibleOf/getNearestDivisibleOf.test.js";
import { testGetPositionInPercentageOf } from "../src/utilities/getPositionInPercentageOf/getPositionInPercentageOf.test.js";
import { testTranslateProportionIntoValue } from "../src/utilities/translateProportionIntoValue/translateProportionIntoValue.test.js";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test.js";

testGetClosestFactorOf();
testGetNearestTo();
testIsValueBetween();
testGetOverstepOf();
testGetNearestDivisibleOf()
testGetPositionInPercentageOf();
testTranslateProportionIntoValue();
testObserverMixin();

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
