import { slider } from "../src/slider.js";


export function testSlider() {


  describe("slider", function () {
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
      update() { },
    };

    const makeClassMock = function (obj) {
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

    describe("create method", function () {

      context("shall create sliderModel with options", function () {
        it("sliderModel arguments is not equal to null", function () {
          assert.isNotNull(sliderModel.arguments);
        });

        it("sliderModel argument is equal to options", function () {
          assert.equal(sliderModel.arguments[0], options);
        });
      });

      context("shall create sliderAdapter with sliderModel, as dataSource", function () {
        it("sliderAdapter arguments is not equal to null", function () {
          assert.isNotNull(sliderAdapter.arguments);
        });

        it("sliderAdapter arguments[0] is equal to sliderModel", function () {
          assert.equal(sliderAdapter.arguments[0], sliderModel);
        });
      });

      context("shall create sliderUi with $parent and sliderAdapter", function () {
        it("sliderUi arguments is not equal to null", function () {
          assert.isNotNull(sliderUi.arguments);
        });

        it("sliderUi arguments[0] is equal to $parent", function () {
          assert.equal(sliderUi.arguments[0], $parent);
        });

        it("sliderUi arguments[1] is equal to sliderAdapter", function () {
          assert.equal(sliderUi.arguments[1], sliderAdapter);
        });
      });

      context("shall subscribe sliderUI update method to sliderAdapter", function () {
        it("sliderAdapter addSubscriberArgs is not equal to null", function () {
          assert.isNotNull(sliderAdapter.addSubscriberArgs);
        });

        it("sliderAdapter addSubscriberArgs[0] is equal to 'update'", function () {
          assert.equal(sliderAdapter.addSubscriberArgs[0], "update");
        });

        it("sliderAdapter addSubscriberArgs[1] is equal to sliderUi update method", function () {
          assert.equal(sliderAdapter.addSubscriberArgs[1], sliderUi.update);
        });
      });

      context("shall create parentsMap with sliderModel, sliderAdapter and sliderUi", function () {
        it("sliderAPI parentsMap length is not equal to 0", function () {
          assert.notEqual(slider._parentsMap.length, 0);
        });

        it("sliderAPI parentsMap $parent is not undefined", function () {
          assert.notEqual(slider._parentsMap.get($parent), undefined);
        });

        it("sliderAPI parentsMap $parent sliderModel is equal to sliderModel", function () {
          assert.equal(slider._parentsMap.get($parent).sliderModel, sliderModel);
        });

        it("sliderAPI parentsMap $parent sliderAdapter is equal to sliderAdapter", function () {
          assert.equal(slider._parentsMap.get($parent).sliderAdapter, sliderAdapter);
        });

        it("sliderAPI parentsMap $parent sliderUi is equal to sliderUi", function () {
          assert.equal(slider._parentsMap.get($parent).sliderUi, sliderUi);
        });
      });
    });


    describe("getOptions method", function () {

      context("shall return current options", function () {
        it("returned options are equal to passed options", function () {
          assert.equal(slider.getOptions($parent), options);
        });
      });

    });


    describe("setOptions method", function () {

      context("shall set sliderAdapter optionsUpdated property", function () {
        const newOptions = {
          boundaries: [0, 100],
          step: 20,
        };

        slider.setOptions($parent, newOptions);

        it("sliderAdapter optionsUpdated is not equal to null", function () {
          assert.isNotNull(sliderAdapter.optionsUpdated);
        });

        it("sliderAdapter optionsUpdated is equal to newOptions", function () {
          assert.equal(sliderAdapter.optionsUpdated, newOptions);
        });
      });

    });
  });
}
