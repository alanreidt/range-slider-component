import {Slider} from "../../../src/Slider";

export function reassignmentBoundariesMax() {
  let options = {
    boundaries: [100, 500],
    values: 180,
    step: 20,
    orientation: "vertical",
    hasTooltips: true,
  };
  let testValues = {
    boundaries: 400,
  }
  let testObject = {
    boundaries: [100, 400],
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
