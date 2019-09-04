import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfStepByBoundaries() {
  let options = {
    boundaries: [100, 500],
    value: 180,
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testValues = {
    boundaries: [150, 500],
  }
  let testObject = {
    step: 25,
  };
  let testSubject = new Slider(options);

  for (let key in testValues) {
    testSubject[key] = testValues[key];
  }

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
