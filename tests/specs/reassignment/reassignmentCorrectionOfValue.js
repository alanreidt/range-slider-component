import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfValue() {
  let options = {
    boundaries: [100, 500],
    value: 180,
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testValues = {
    value: 190,
  }
  let testObject = {
    value: 200,
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
