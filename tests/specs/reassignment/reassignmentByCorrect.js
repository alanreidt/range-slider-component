import {Slider} from "../../../src/Slider";

export function reassignmentByCorrect() {
  let testValues = {
    boundaries: [100, 500],
    value: 180,
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testObject = testValues;
  let testSubject = new Slider();

  for (let key in testValues) {
    testSubject[key] = testValues[key];
  }

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
