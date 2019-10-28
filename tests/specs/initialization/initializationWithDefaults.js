import {Slider} from "../../../src/Slider";

export function initializationWithDefaults() {
  let testSubject = new Slider();
  let testObject = {
    boundaries: [0, 100],
    values: 50,
    step: 1,
    orientation: "horizontal",
    hasTooltips: false,
  };

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
