import { assert } from "chai";

import { SliderAdapter } from "../src/SliderAdapter";

export function testSliderAdapter() {
  describe("SliderAdapter", () => {
    describe("shall organize access to the dataSource", () => {
      describe("update values of the dataSource", () => {
        const newValues = {
          boundaries: [100, 500],
          step: 20,
          hasTooltips: true,
        };
        const sliderModel = {
          setOptions(newOptions) {
            this.options = newOptions;
          },
        };
        const sliderAdapter = new SliderAdapter(sliderModel);

        sliderAdapter.setOptions(newValues);

        Object.entries(newValues).forEach(([key, value]) => {
          it(`${key} equals to ${value}`, () => {
            assert.deepEqual(sliderModel.options[key], value);
          });
        });
      });

      describe("returns values of the dataSource", () => {
        const options = {
          boundaries: [0, 100],
          values: [20, 80],
          step: 1,
          orientation: "horizontal",
          hasTooltips: true,
        };
        const expectations = options;
        const sliderModel = {
          options,
          getOptions() {
            return this.options;
          },
        };
        const sliderAdapter = new SliderAdapter(sliderModel);

        const sliderOptions = sliderAdapter.getOptions();

        Object.entries(expectations).forEach(([key, value]) => {
          it(`${key} equals to ${value}`, () => {
            assert.deepEqual(sliderOptions[key], value);
          });
        });
      });
    });
  });
}
