import { SliderAdapter } from "../src/SliderAdapter";


export function testSliderAdapter() {


  describe("SliderAdapter", function () {

    describe("shall organize access to the dataSource", function () {
      describe("update values of the dataSource", function () {
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
          it(`${key} equals to ${newValues[key]}`, function () {
            assert.deepEqual(sliderModel.options[key], newValues[key]);
          });
        }
      });


      describe("returns values of the dataSource", function () {
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
          getOptions() {
            return this.options;
          },
        };
        const sliderAdapter = new SliderAdapter(sliderModel);

        const sliderOptions = sliderAdapter.getOptions();

        for (let key in expectations) {
          it(`${key} equals to ${expectations[key]}`, function () {
            assert.deepEqual(sliderOptions[key], expectations[key]);
          });
        }
      });
    });

  });


}
