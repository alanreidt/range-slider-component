import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfValue() {
  let testValues = {
    boundaries: [ [0, 500], [-500, 500], [-1000, -500] ],
    step: [100, 250, 50],
    value: [190, -100, -525],
  };
  let testObject = {
    value: [200, 0, -500],
  };
  let testSubject = new Slider();
  let testValuesKeys = Object.keys(testValues);
  let testObjectKeys = Object.keys(testObject);

  testObjectKeys.forEach(testObjectKey => {

    for (let i = 0; i < testObject[testObjectKey].length; i++) {
      for (let key in testValues) {
        testSubject[key] = testValues[key][i];
      }

      let testSubjectValue = testSubject[testObjectKey];
      let passedValuesRecord = '';

      testValuesKeys.forEach(testValuesKey => {
        passedValuesRecord += `${testValuesKey} = ${testValues[testValuesKey][i]}, `;
      });

      it(`if ${passedValuesRecord} were passed,
      than corrects value to ${testObject[testObjectKey][i]}`, function() {
        assert.deepEqual( testSubjectValue, testObject[testObjectKey][i] );
      });
    }

  });
}
