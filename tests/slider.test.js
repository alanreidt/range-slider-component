import { assert } from "chai";

import { slider } from "../src/slider";

export function testSlider() {
  describe("slider", () => {
    const options = {
      boundaries: [100, 500],
      values: [200, 300],
      step: 20,
      orientation: "horizontal",
      hasTooltips: true,
    };
    const sliderModel = {
      arguments: null,
      addSubscriberArgs: null,

      getOptions() {
        return options;
      },

      setOptions(newOptions) {
        this.optionsUpdated = newOptions;
      },

      setValueAt(index, value) {
        this.valueUpdated = [index, value];
      },

      addSubscriber(...args) {
        this.addSubscriberArgs = args;
      },
    };
    const sliderUI = {
      arguments: null,
      setElements() {},
    };

    const makeClassMock = (obj) => {
      return (...newOptions) => {
        obj.arguments = newOptions;

        return obj;
      };
    };

    const factory = {
      createModel: makeClassMock(sliderModel),
      createUI: makeClassMock(sliderUI),
    };
    const $parent = document.createElement("div");

    slider._factory = factory;
    slider.create($parent, options);

    describe("create method", () => {
      context("shall create sliderModel with options", () => {
        it("sliderModel arguments is not equal to null", () => {
          assert.isNotNull(sliderModel.arguments);
        });

        it("sliderModel argument is equal to options", () => {
          assert.equal(sliderModel.arguments[0], options);
        });
      });

      context("shall create sliderUI with $parent and sliderModel", () => {
        it("sliderUI arguments is not equal to null", () => {
          assert.isNotNull(sliderUI.arguments);
        });

        it("sliderUI arguments[0] is equal to $parent", () => {
          assert.equal(sliderUI.arguments[0], $parent);
        });

        it("sliderUI arguments[1] is equal to sliderModel", () => {
          assert.equal(sliderUI.arguments[1], sliderModel);
        });
      });

      context(
        "shall subscribe sliderUI setElements method to sliderModel",
        () => {
          it("sliderModel addSubscriberArgs is not equal to null", () => {
            assert.isNotNull(sliderModel.addSubscriberArgs);
          });

          it("sliderModel addSubscriberArgs[0] is equal to 'update'", () => {
            assert.equal(sliderModel.addSubscriberArgs[0], "update");
          });

          it("sliderModel addSubscriberArgs[1] is equal to sliderUI setElements method", () => {
            assert.equal(
              sliderModel.addSubscriberArgs[1],
              sliderUI.setElements,
            );
          });
        },
      );

      context("shall create parentsMap with sliderModel and sliderUI", () => {
        it("sliderAPI parentsMap length is not equal to 0", () => {
          assert.notEqual(slider._parentsMap.length, 0);
        });

        it("sliderAPI parentsMap $parent is not undefined", () => {
          assert.notEqual(slider._parentsMap.get($parent), undefined);
        });

        it("sliderAPI parentsMap $parent sliderModel is equal to sliderModel", () => {
          assert.equal(
            slider._parentsMap.get($parent).sliderModel,
            sliderModel,
          );
        });

        it("sliderAPI parentsMap $parent sliderUI is equal to sliderUI", () => {
          assert.equal(slider._parentsMap.get($parent).sliderUI, sliderUI);
        });
      });
    });

    describe("getOptions method", () => {
      context("shall return current options", () => {
        it("returned options are equal to passed options", () => {
          assert.equal(slider.getOptions($parent), options);
        });
      });
    });

    describe("setOptions method", () => {
      context("shall set sliderModel optionsUpdated property", () => {
        const newOptions = {
          boundaries: [0, 100],
          step: 20,
        };

        slider.setOptions($parent, newOptions);

        it("sliderModel optionsUpdated is not equal to undefined", () => {
          assert.notEqual(sliderModel.optionsUpdated, undefined);
        });

        it("sliderModel optionsUpdated is equal to newOptions", () => {
          assert.equal(sliderModel.optionsUpdated, newOptions);
        });
      });
    });

    describe("setValueAt method", () => {
      context("shall set sliderModel valueUpdated property", () => {
        const index = 1;
        const newValue = 30;
        const expectation = [index, newValue];

        slider.setValueAt($parent, index, newValue);

        it("sliderModel valueUpdated is not equal to undefined", () => {
          assert.notEqual(sliderModel.valueUpdated, undefined);
        });

        it("sliderModel valueUpdated is equal to newOptions", () => {
          assert.deepEqual(sliderModel.valueUpdated, expectation);
        });
      });
    });
  });
}
