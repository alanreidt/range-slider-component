import {Slider} from "../../../src/Slider";

export function reassignmentCorrectionOfValue() {
  let testOptions = [
    {boundaries: [0, 500], step: 100, value: 190},
    {boundaries: [-500, 500], step: 250, value: -100},
    {boundaries: [-1000, -500], step: 50, value: -525},
  ];
  let testExpectations = [
    {value: 200},
    {value: 0},
    {value: -500},
  ];
  let subject = new Slider();

  testExpectations.forEach( (testExpectation, index) => {

    for (let testExpectationKey in testExpectation) {
      let testExpectationValue = testExpectation[testExpectationKey];
      let testOption = testOptions[index];
      let testOptionsRecord = '';

      for (let testOptionKey in testOption) {
        let testOptionValue = testOption[testOptionKey];

        subject[testOptionKey] = testOptionValue;
        testOptionsRecord += `${testOptionKey} = ${testOptionValue}, `;
      };

      let subjectValue = subject[testExpectationKey];

      it(`if ${testOptionsRecord} were passed,
      than ${testExpectationKey} results in ${testExpectationValue}`, function() {
        assert.deepEqual( subjectValue, testExpectationValue );
      });
    }

  });
}
