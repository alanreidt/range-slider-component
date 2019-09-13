import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfValue() {
  let testValues = {
    boundaries: [ [0, 500], [-500, 500], [-1000, -500] ],
    step: [100, 250, 50],
    value: [190, -100, -525],
  };
  let testObject = [200, 0, -500];
  let testSubject = new Slider();

  for (let i = 0; i < testObject.length; i++) {
    for (let key in testValues) {
      testSubject[key] = testValues[key][i];
    }

    let testSubjectValue = testSubject.value;

    it(`if boundaries = ${testSubject.boundaries}, step = ${testSubject.step},
    value = ${testSubject.value} were passed,
    than corrects value to ${testObject[i]}`, function() {
      assert.deepEqual( testSubjectValue, testObject[i] );
    });
  }
}
