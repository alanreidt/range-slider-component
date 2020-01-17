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
    const model = {
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
      createModel: makeClassMock(model),
      createUI: makeClassMock(sliderUI),
    };
    const $parent = document.createElement("div");

    slider._factory = factory;
    slider.create($parent, options);

    describe("create method", () => {
      context("shall create model with options", () => {
        it("model arguments is not equal to null", () => {
          assert.isNotNull(model.arguments);
        });

        it("model argument is equal to options", () => {
          assert.equal(model.arguments[0], options);
        });
      });

      context("shall create sliderUI with $parent and model", () => {
        it("sliderUI arguments is not equal to null", () => {
          assert.isNotNull(sliderUI.arguments);
        });

        it("sliderUI arguments[0] is equal to $parent", () => {
          assert.equal(sliderUI.arguments[0], $parent);
        });

        it("sliderUI arguments[1] is equal to model", () => {
          assert.equal(sliderUI.arguments[1], model);
        });
      });

      context("shall subscribe sliderUI setElements method to model", () => {
        it("model addSubscriberArgs is not equal to null", () => {
          assert.isNotNull(model.addSubscriberArgs);
        });

        it("model addSubscriberArgs[0] is equal to 'update'", () => {
          assert.equal(model.addSubscriberArgs[0], "update");
        });

        it("model addSubscriberArgs[1] is equal to sliderUI setElements method", () => {
          assert.equal(model.addSubscriberArgs[1], sliderUI.setElements);
        });
      });

      context("shall create parentsMap with model and sliderUI", () => {
        it("sliderAPI parentsMap length is not equal to 0", () => {
          assert.notEqual(slider._parentsMap.length, 0);
        });

        it("sliderAPI parentsMap $parent is not undefined", () => {
          assert.notEqual(slider._parentsMap.get($parent), undefined);
        });

        it("sliderAPI parentsMap $parent model is equal to model", () => {
          assert.equal(slider._parentsMap.get($parent).sliderModel, model);
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
      context("shall set model optionsUpdated property", () => {
        const newOptions = {
          boundaries: [0, 100],
          step: 20,
        };

        slider.setOptions($parent, newOptions);

        it("model optionsUpdated is not equal to undefined", () => {
          assert.notEqual(model.optionsUpdated, undefined);
        });

        it("model optionsUpdated is equal to newOptions", () => {
          assert.equal(model.optionsUpdated, newOptions);
        });
      });
    });

    describe("setValueAt method", () => {
      context("shall set model valueUpdated property", () => {
        const index = 1;
        const newValue = 30;
        const expectation = [index, newValue];

        slider.setValueAt($parent, index, newValue);

        it("model valueUpdated is not equal to undefined", () => {
          assert.notEqual(model.valueUpdated, undefined);
        });

        it("model valueUpdated is equal to newOptions", () => {
          assert.deepEqual(model.valueUpdated, expectation);
        });
      });
    });
  });
}
