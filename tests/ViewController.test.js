import { assert } from "chai";

import { simulateMouseEvent } from "./testUtilities";
import { ViewController } from "../src/ViewController";

export function testSliderUI() {
  describe("ViewController", () => {
    const SLIDER_NAME = "slider";
    const SLIDER_BASE_NAME = "slider__base";
    const SLIDER_ORIENTATION_FLAG = "slider_vertical";
    const SLIDER_HANDLE_GROUP_NAME = "slider__handle-group";
    const SLIDER_TOOLTIP_NAME = "slider__tooltip";
    const SLIDER_HANDLE_NAME = "slider__handle";

    describe("constructor", () => {
      describe("shall paint $slider structure", () => {
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
          },
        };
        let $parent;

        beforeEach(() => {
          $parent = document.createElement("div");
          new ViewController($parent, model);
        });

        context("paint static structure correctly", () => {
          it(`create ${SLIDER_NAME} element`, () => {
            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);

            assert.isNotNull($slider);
          });

          it(`create ${SLIDER_BASE_NAME} element`, () => {
            const sliderBase = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

            assert.isNotNull(sliderBase);
          });
        });

        context("paint dynamic structure correctly", () => {
          const requiredQuantity = options.values.length;

          it(`create ${requiredQuantity} ${SLIDER_HANDLE_GROUP_NAME} elements`, () => {
            const handleGroups = $parent.querySelectorAll(
              `.${SLIDER_HANDLE_GROUP_NAME}`,
            );

            assert.equal(requiredQuantity, handleGroups.length);
          });

          it(`create ${requiredQuantity} ${SLIDER_TOOLTIP_NAME} elements`, () => {
            const tooltips = $parent.querySelectorAll(
              `.${SLIDER_TOOLTIP_NAME}`,
            );

            assert.equal(requiredQuantity, tooltips.length);
          });

          it(`create ${requiredQuantity} ${SLIDER_HANDLE_NAME} elements`, () => {
            const handles = $parent.querySelectorAll(`.${SLIDER_HANDLE_NAME}`);

            assert.equal(requiredQuantity, handles.length);
          });
        });
      });

      describe(`shall add ${SLIDER_ORIENTATION_FLAG}, when needed`, () => {
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
          },
        };

        it(`add ${SLIDER_ORIENTATION_FLAG} className, if orientation is vertical`, () => {
          new ViewController($parent, model);
          const sliderClassList = $parent.querySelector(`.${SLIDER_NAME}`)
            .classList;

          assert.isTrue(sliderClassList.contains(`${SLIDER_ORIENTATION_FLAG}`));
        });

        it("add nothing, if orientation is horizontal", () => {
          Object.assign(options, {
            orientation: "horizontal",
          });
          new ViewController($parent, model);
          const sliderClassList = $parent.querySelector(`.${SLIDER_NAME}`)
            .classList;

          assert.isFalse(
            sliderClassList.contains(`${SLIDER_ORIENTATION_FLAG}`),
          );
        });
      });

      describe(`shall create ${SLIDER_TOOLTIP_NAME} element, when needed`, () => {
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
          },
        };

        it(`create ${SLIDER_TOOLTIP_NAME} element, if hasTooltips flag is true`, () => {
          new ViewController($parent, model);
          const sliderTooltips = $parent.querySelector(
            `.${SLIDER_TOOLTIP_NAME}`,
          );

          assert.isNotNull(sliderTooltips);
        });

        it(`create nothing, if hasTooltips flag is false`, () => {
          Object.assign(options, {
            hasTooltips: false,
          });
          new ViewController($parent, model);
          const sliderTooltips = $parent.querySelector(
            `.${SLIDER_TOOLTIP_NAME}`,
          );

          assert.isNull(sliderTooltips);
        });
      });

      context("shall repaint (refresh) $slider structure", () => {
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
          },
        };
        new ViewController($parent, model);

        const $slider = $parent.querySelector(`.${SLIDER_NAME}`);

        it("$slider and repainted $slider (with the same values) are not equal", () => {
          new ViewController($parent, model);

          const $newSlider = $parent.querySelector(`.${SLIDER_NAME}`);

          assert.notEqual($slider, $newSlider);
        });
      });

      describe("shall handle user actions (Controller)", () => {
        const $parent = document.createElement("div");
        document.body.append($parent);

        describe("shall listen to events on $base element", () => {
          context("trigger model setOptions method on mousedown event", () => {
            const mousePositionValues = [20, 100, 200];
            const expectationValues = [10, 50, 100];

            mousePositionValues.forEach((mousePositionValue, i) => {
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

                setOptions(newOptions) {
                  this.isTriggered = true;
                  this._options = {
                    ...options,
                    ...newOptions,
                  };
                },
              };

              new ViewController($parent, model);

              const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
              const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

              $slider.style.width = "200px";

              const expectationValue = expectationValues[i];

              simulateMouseEvent("mousedown", $base, {
                clientX: mousePositionValue,
              });
              simulateMouseEvent("mouseup", $base);

              it(`model setOptions is triggered on mouse event ${i +
                1}`, () => {
                assert.isTrue(model.isTriggered);
              });

              it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, () => {
                assert.deepEqual(expectationValue, model._options.values);
              });
            });
          });

          context(
            `trigger model setOptions method on mousedown event,
          when slider is vertical`,
            () => {
              const mousePositionValues = [20, 100, 200];
              const expectationValues = [10, 50, 100];

              mousePositionValues.forEach((mousePositionValue, i) => {
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

                  setOptions(newOptions) {
                    this.isTriggered = true;
                    this._options = {
                      ...options,
                      ...newOptions,
                    };
                  },
                };

                new ViewController($parent, model);

                const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
                const $base = $parent.querySelector(`.${SLIDER_BASE_NAME}`);

                $slider.style.height = "200px";

                const expectationValue = expectationValues[i];

                simulateMouseEvent("mousedown", $base, {
                  clientY: mousePositionValue,
                });
                simulateMouseEvent("mouseup", $base);

                it(`model setOptions is triggered on mouse event ${i +
                  1}`, () => {
                  assert.isTrue(model.isTriggered);
                });

                it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, () => {
                  assert.deepEqual(expectationValue, model._options.values);
                });
              });
            },
          );

          $parent.innerHTML = "";
        });

        describe("shall listen to events on $handle element", () => {
          context(
            "trigger model setValueAt method on mousemove during mousedown event",
            () => {
              const mousePositionValues = [20, 100, 200];
              const expectationValues = [
                [0, 10],
                [0, 50],
                [0, 100],
              ];

              mousePositionValues.forEach((mousePositionValue, i) => {
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

                  setValueAt(index, newValue) {
                    this.isTriggered = true;
                    this.value = [index, newValue];
                  },
                };

                new ViewController($parent, model);

                const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
                const $handle = $parent.querySelector(`.${SLIDER_HANDLE_NAME}`);

                $slider.style.width = "200px";

                const expectationValue = expectationValues[i];

                simulateMouseEvent("mousedown", $handle);
                simulateMouseEvent("mousemove", document, {
                  clientX: mousePositionValue,
                });
                simulateMouseEvent("mouseup", document);

                it(`model setOptions is triggered on mouse event ${i +
                  1}`, () => {
                  assert.isTrue(model.isTriggered);
                });

                it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, () => {
                  assert.deepEqual(expectationValue, model.value);
                });
              });
            },
          );

          context(
            `trigger model setValueAt method on mousedown event,
          when slider is vertical`,
            () => {
              const mousePositionValues = [20, 100, 200];
              const expectationValues = [
                [0, 10],
                [0, 50],
                [0, 100],
              ];

              mousePositionValues.forEach((mousePositionValue, i) => {
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

                  setValueAt(index, newValue) {
                    this.isTriggered = true;
                    this.value = [index, newValue];
                  },
                };

                new ViewController($parent, model);

                const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
                const $handle = $parent.querySelector(`.${SLIDER_HANDLE_NAME}`);

                $slider.style.height = "200px";

                const expectationValue = expectationValues[i];

                simulateMouseEvent("mousedown", $handle);
                simulateMouseEvent("mousemove", document, {
                  clientY: mousePositionValue,
                });
                simulateMouseEvent("mouseup", document);

                it(`model setOptions is triggered on mouse event ${i +
                  1}`, () => {
                  assert.isTrue(model.isTriggered);
                });

                it(`passed value = ${expectationValue} on mouse position = ${mousePositionValue}`, () => {
                  assert.deepEqual(expectationValue, model.value);
                });
              });
            },
          );

          context("remove listeners on mouseup after mousedown event", () => {
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

              setOptions(newOptions) {
                this.isTriggered = true;
                this._options = {
                  ...options,
                  ...newOptions,
                };
              },
            };

            new ViewController($parent, model);

            const $slider = $parent.querySelector(`.${SLIDER_NAME}`);
            const $handle = $parent.querySelector(`.${SLIDER_HANDLE_NAME}`);

            $slider.style.height = "200px";

            const modelValues = model._options.values.slice();

            simulateMouseEvent("mousedown", $handle);
            simulateMouseEvent("mouseup", document);
            simulateMouseEvent("mousemove", document, { clientY: 100 });

            it(`model setOptions is not triggered on mouse event`, () => {
              assert.isFalse(model.isTriggered);
            });

            it(`model values are equal to ${modelValues}`, () => {
              assert.deepEqual(modelValues, model._options.values);
            });
          });

          $parent.innerHTML = "";
        });
      });
    });

    describe("setElements method", () => {
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
        },
      };
      const viewController = new ViewController($parent, model);

      describe("shall set values", () => {
        context(`${SLIDER_HANDLE_GROUP_NAME}s are set`, () => {
          const handleGroups = Array.from(
            $parent.querySelectorAll(`.${SLIDER_HANDLE_GROUP_NAME}`),
          );

          handleGroups.forEach((handleGroup, i) => {
            const value = options.values[i];
            const regexp = new RegExp(`${value}`);
            const handleGroupStyle = handleGroup.getAttribute("style");

            it(`${SLIDER_HANDLE_GROUP_NAME}${i + 1} equals to ${value}`, () => {
              assert.isNotNull(handleGroupStyle.match(regexp));
            });
          });
        });
      });

      describe("shall update values", () => {
        const newValues = [10, 60];

        viewController.setElements({
          boundaries: [0, 100],
          values: newValues,
        });

        context(`${SLIDER_HANDLE_GROUP_NAME}s are updated`, () => {
          const handleGroups = Array.from(
            $parent.querySelectorAll(`.${SLIDER_HANDLE_GROUP_NAME}`),
          );

          handleGroups.forEach((handleGroup, i) => {
            const value = newValues[i];
            const regexp = new RegExp(`${value}`);
            const handleGroupStyle = handleGroup.getAttribute("style");

            it(`${SLIDER_HANDLE_GROUP_NAME}${i + 1} equals to ${value}`, () => {
              assert.isNotNull(handleGroupStyle.match(regexp));
            });
          });
        });
      });
    });
  });
}
