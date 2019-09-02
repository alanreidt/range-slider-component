import {Slider} from "../../src/Slider";

export function initializationWithDefaults() {
  let testSubject = new Slider();
  let testObject = {
    boundaries: [0, 100],
    value: 50,
    step: null,
    orientation: "horizontal",
    tooltips: false,
  };

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
