import {Slider} from "../../../src/Slider";

export function reassignmentByIncorrect() {
  let options = {
    boundaries: [100, 500],
    value: 180,
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testValues = {
    boundaries: [true, false],
    value: false,
    step: "two",
    orientation: 100,
    tooltips: 2,
  };
  let testObject = options;
  let testSubject = new Slider(options);

  for (let key in testValues) {
    testSubject[key] = testValues[key];
  }

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]} (was passed: ${testValues[key]})`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
