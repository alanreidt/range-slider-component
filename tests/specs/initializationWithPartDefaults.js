import {Slider} from "../../src/Slider";

export function initializationWithPartDefaults() {
  let options = {
    boundaries: [5000, 40000],
    value: 20000,
    step: 50,
    orientation: "vertical",
  };
  let testObject = {
    boundaries: [5000, 40000],
    value: 20000,
    step: 50,
    orientation: "vertical",
    tooltips: false,
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]} (was passed: ${options[key]})`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
