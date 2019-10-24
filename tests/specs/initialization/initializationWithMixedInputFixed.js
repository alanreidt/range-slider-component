import {Slider} from "../../../src/Slider";

export function initializationWithMixedInputFixed() {
  let options = {
    boundaries: [0, "1000px"],
    values: ["0$", 600],
    step: "100",
  };
  let testObject = {
    boundaries: [0, 1000],
    values: [0, 600],
    step: 100,
    orientation: "horizontal",
    tooltips: false,
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]} (was passed: ${options[key]})`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
