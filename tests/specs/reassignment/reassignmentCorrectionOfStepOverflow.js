import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfStepOverflow() {
  let options = {
    boundaries: [100, 500],
    value: 100,
    step: 200,
    orientation: "vertical",
    tooltips: true,
  };
  let testValues = {
    step: 800,
  }
  let testObject = {
    step: 400,
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
