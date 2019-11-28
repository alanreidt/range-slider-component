import {
  setElementPosition,
  setElementsPosition} from "../src/utilities/utilities.js";
import { simulateMouseEvent } from "./testUtilities";
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
import { testSliderAdapter } from "./SliderAdapter.test.js";
import { testSliderModel } from "./SliderModel.test.js";

testGetClosestFactorOf();
testGetNearestTo();
testIsValueBetween();
testGetOverstepOf();
testGetNearestDivisibleOf()
testGetPositionInPercentageOf();
testTranslateProportionIntoValue();
testObserverMixin();

testSliderAdapter();

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

testSliderModel();

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
