import { assert } from "chai";

import { slider } from "../src/slider";

export function testSlider() {
  describe("slider", () => {
    const sliderModel = {
      arguments: null,
    };
    const options = {
      boundaries: [100, 500],
      values: [200, 300],
      step: 20,
      orientation: "horizontal",
      hasTooltips: true,
    };
    const sliderAdapter = {
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
    const sliderUi = {
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
      createAdapter: makeClassMock(sliderAdapter),
      createUI: makeClassMock(sliderUi),
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

      context(
        "shall create sliderAdapter with sliderModel, as dataSource",
        () => {
          it("sliderAdapter arguments is not equal to null", () => {
            assert.isNotNull(sliderAdapter.arguments);
          });

          it("sliderAdapter arguments[0] is equal to sliderModel", () => {
            assert.equal(sliderAdapter.arguments[0], sliderModel);
          });
        },
      );

      context("shall create sliderUi with $parent and sliderAdapter", () => {
        it("sliderUi arguments is not equal to null", () => {
          assert.isNotNull(sliderUi.arguments);
        });

        it("sliderUi arguments[0] is equal to $parent", () => {
          assert.equal(sliderUi.arguments[0], $parent);
        });

        it("sliderUi arguments[1] is equal to sliderAdapter", () => {
          assert.equal(sliderUi.arguments[1], sliderAdapter);
        });
      });

      context(
        "shall subscribe sliderUI setElements method to sliderAdapter",
        () => {
          it("sliderAdapter addSubscriberArgs is not equal to null", () => {
            assert.isNotNull(sliderAdapter.addSubscriberArgs);
          });

          it("sliderAdapter addSubscriberArgs[0] is equal to 'update'", () => {
            assert.equal(sliderAdapter.addSubscriberArgs[0], "update");
          });

          it("sliderAdapter addSubscriberArgs[1] is equal to sliderUi setElements method", () => {
            assert.equal(
              sliderAdapter.addSubscriberArgs[1],
              sliderUi.setElements,
            );
          });
        },
      );

      context(
        "shall create parentsMap with sliderModel, sliderAdapter and sliderUi",
        () => {
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

          it("sliderAPI parentsMap $parent sliderAdapter is equal to sliderAdapter", () => {
            assert.equal(
              slider._parentsMap.get($parent).sliderAdapter,
              sliderAdapter,
            );
          });

          it("sliderAPI parentsMap $parent sliderUi is equal to sliderUi", () => {
            assert.equal(slider._parentsMap.get($parent).sliderUi, sliderUi);
          });
        },
      );
    });

    describe("getOptions method", () => {
      context("shall return current options", () => {
        it("returned options are equal to passed options", () => {
          assert.equal(slider.getOptions($parent), options);
        });
      });
    });

    describe("setOptions method", () => {
      context("shall set sliderAdapter optionsUpdated property", () => {
        const newOptions = {
          boundaries: [0, 100],
          step: 20,
        };

        slider.setOptions($parent, newOptions);

        it("sliderAdapter optionsUpdated is not equal to undefined", () => {
          assert.notEqual(sliderAdapter.optionsUpdated, undefined);
        });

        it("sliderAdapter optionsUpdated is equal to newOptions", () => {
          assert.equal(sliderAdapter.optionsUpdated, newOptions);
        });
      });
    });

    describe("setValueAt method", () => {
      context("shall set sliderAdapter valueUpdated property", () => {
        const index = 1;
        const newValue = 30;
        const expectation = [index, newValue];

        slider.setValueAt($parent, index, newValue);

        it("sliderAdapter valueUpdated is not equal to undefined", () => {
          assert.notEqual(sliderAdapter.valueUpdated, undefined);
        });

        it("sliderAdapter valueUpdated is equal to newOptions", () => {
          assert.deepEqual(sliderAdapter.valueUpdated, expectation);
        });
      });
    });
  });
}
