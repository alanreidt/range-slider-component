import { assert } from 'chai';

import Slider from './Slider';

describe('Slider', () => {
  const options = {
    boundaries: [100, 500],
    values: [200, 300],
    step: 20,
    orientation: 'horizontal',
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
  const viewController = {
    arguments: null,
    setElements() {},
  };

  const makeClassMock = (obj) => {
    return (...newOptions) => {
      obj.arguments = newOptions;

      return obj;
    };
  };

  const Factory = {
    createModel: makeClassMock(model),
    createViewController: makeClassMock(viewController),
  };
  const parent = document.createElement('div');

  Slider.create(parent, options, Factory);

  describe('create method', () => {
    context('shall create model with options', () => {
      it('model arguments is not equal to null', () => {
        assert.isNotNull(model.arguments);
      });

      it('model argument is equal to options', () => {
        assert.equal(model.arguments[0], options);
      });
    });

    context('shall create viewController with parent and model', () => {
      it('viewController arguments is not equal to null', () => {
        assert.isNotNull(viewController.arguments);
      });

      it('viewController arguments[0] is equal to parent', () => {
        assert.equal(viewController.arguments[0], parent);
      });

      it('viewController arguments[1] is equal to model', () => {
        assert.equal(viewController.arguments[1], model);
      });
    });

    context(
      'shall subscribe viewController setElements method to model',
      () => {
        it('model addSubscriberArgs is not equal to null', () => {
          assert.isNotNull(model.addSubscriberArgs);
        });

        it("model addSubscriberArgs[0] is equal to 'update'", () => {
          assert.equal(model.addSubscriberArgs[0], 'update');
        });

        it('model addSubscriberArgs[1] is equal to viewController setElements method', () => {
          assert.equal(model.addSubscriberArgs[1], viewController.setElements);
        });
      },
    );

    context('shall create parentsMap with model and viewController', () => {
      it('sliderAPI parentsMap length is not equal to 0', () => {
        assert.notEqual(Slider._parentsMap.length, 0);
      });

      it('sliderAPI parentsMap parent is not undefined', () => {
        assert.notEqual(Slider._parentsMap.get(parent), undefined);
      });

      it('sliderAPI parentsMap parent model is equal to model', () => {
        assert.equal(Slider._parentsMap.get(parent).model, model);
      });

      it('sliderAPI parentsMap parent viewController is equal to viewController', () => {
        assert.equal(
          Slider._parentsMap.get(parent).viewController,
          viewController,
        );
      });
    });
  });

  describe('getOptions method', () => {
    context('shall return current options', () => {
      it('returned options are equal to passed options', () => {
        assert.equal(Slider.getOptions(parent), options);
      });
    });
  });

  describe('setOptions method', () => {
    context('shall set model optionsUpdated property', () => {
      const newOptions = {
        boundaries: [0, 100],
        step: 20,
      };

      Slider.setOptions(parent, newOptions);

      it('model optionsUpdated is not equal to undefined', () => {
        assert.notEqual(model.optionsUpdated, undefined);
      });

      it('model optionsUpdated is equal to newOptions', () => {
        assert.equal(model.optionsUpdated, newOptions);
      });
    });
  });

  describe('setValueAt method', () => {
    context('shall set model valueUpdated property', () => {
      const index = 1;
      const newValue = 30;
      const expectation = [index, newValue];

      Slider.setValueAt(parent, index, newValue);

      it('model valueUpdated is not equal to undefined', () => {
        assert.notEqual(model.valueUpdated, undefined);
      });

      it('model valueUpdated is equal to newOptions', () => {
        assert.deepEqual(model.valueUpdated, expectation);
      });
    });
  });
});
