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
    let testObjectValue = testObject[testObjectKey];

    for (let i = 0; i < testObjectValue.length; i++) {
      let testValuesRecord = '';

      testValuesKeys.forEach(key => {
        let testValuesValue = testValues[key];

        testSubject[key] = testValuesValue[i];
        testValuesRecord += `${key} = ${testValuesValue[i]}, `;
      });

      let testSubjectValue = testSubject[testObjectKey];

      it(`if ${testValuesRecord} were passed,
      than corrects value to ${testObjectValue[i]}`, function() {
        assert.deepEqual( testSubjectValue, testObjectValue[i] );
      });
    }

  });
}
