import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfValue() {
  let testValueEntries = [
    {boundaries: [0, 500], step: 100, value: 190},
    {boundaries: [-500, 500], step: 250, value: -100},
    {boundaries: [-1000, -500], step: 50, value: -525},
  ];
  let testObjectEntries = [
    {value: 200},
    {value: 0},
    {value: -500},
  ];
  let testSubject = new Slider();
  // let testValuesKeys = Object.keys(testValues);
  // let testObjectKeys = Object.keys(testObject);

  testObjectEntries.forEach( (testObjectEntry, index) => {

    // let testObjectValue = testObject[testObjectKey];

    for (let testObjectEntryKey in testObjectEntry) {
      let testValueEntry = testValueEntries[index];
      let testValueEntryRecord = '';

      for (let key in testValueEntry) {
        // let testValuesValue = testValues[key];

        testSubject[key] = testValueEntry[key];
        testValueEntryRecord += `${key} = ${testValueEntry[key]}, `;
      };

      let testSubjectValue = testSubject[testObjectEntryKey];

      it(`if ${testValueEntryRecord} were passed,
      than corrects value to ${testObjectEntry[testObjectEntryKey]}`, function() {
        assert.deepEqual( testSubjectValue, testObjectEntry[testObjectEntryKey] );
      });
    }

  });
}
