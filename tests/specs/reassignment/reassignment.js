import {reassignmentByCorrect} from "./reassignmentByCorrect";
import {reassignmentByIncorrect} from "./reassignmentByIncorrect";
import {reassignmentCorrectionOfValueByBoundaries} from "./reassignmentCorrectionOfValueByBoundaries";
import {reassignmentCorrectionOfStepByBoundaries} from "./reassignmentCorrectionOfStepByBoundaries";
import {reassignmentCorrectionOfStepOverflowByBoundaries} from "./reassignmentCorrectionOfStepOverflowByBoundaries";
import {reassignmentCorrectionOfValueByStep} from "./reassignmentCorrectionOfValueByStep";
import {reassignmentCorrectionOfValueOverflow} from "./reassignmentCorrectionOfValueOverflow";
import {reassignmentCorrectionOfValue} from "./reassignmentCorrectionOfValue";
import {reassignmentCorrectionOfStep} from "./reassignmentCorrectionOfStep";
import {reassignmentCorrectionOfStepOverflow} from "./reassignmentCorrectionOfStepOverflow";
import {reassignmentBoundariesMin} from "./reassignmentBoundariesMin";
import {reassignmentBoundariesMax} from "./reassignmentBoundariesMax";
import {reassignmentValueArray} from "./reassignmentValueArray";
import {reassignmentValueArrayWithIncorrect} from "./reassignmentValueArrayWithIncorrect";
import {reassignmentValueDefault} from "./reassignmentValueDefault";

import {Slider} from "../../../src/Slider";

function test(subject, options, expectations) {

  expectations.forEach( (expectation, index) => {
    for (let expectationKey in expectation) {
      let expectationValue = expectation[expectationKey];
      let option = options[index];
      let optionsRecord = '';

      for (let optionKey in option) {
        let optionValue = option[optionKey];

        subject[optionKey] = optionValue;
        optionsRecord += `${optionKey} = ${optionValue}, `;
      };

      let subjectValue = subject[expectationKey];

      it(`if ${optionsRecord} were passed,
      than ${expectationKey} results in ${expectationValue}`, function() {
        assert.deepEqual( subjectValue, expectationValue );
      });
    }
  });

}


export function reassignment() {

  describe("shall change values, if correct one is passed", function() {
    let options = [
      {boundaries: [100, 500]},
      {value: 180},
      {step: 20},
      {orientation: "vertical"},
      {tooltips: true},
    ];
    let expectations = options;
    let subject = new Slider();

    test(subject, options, expectations);
  });


  describe("shall not change values, if incorrect one is passed", function() {
    reassignmentByIncorrect();
  });


  describe("shall correct values", function() {

    context(`shall correct {value},
    if passed value isn't correspond to {step}`, function() {
      reassignmentCorrectionOfValue();
    });

    context(`shall correct {value},
    if passed value is out of {boundaries}`, function() {
      reassignmentCorrectionOfValueOverflow();
    });

    context(`shall correct {step},
    if passed value isn't correspond to {boundaries(range)}`, function() {
      reassignmentCorrectionOfStep();
    });

    context(`shall correct {step},
    if passed value is bigger than difference of {boundaries(range)}`, function() {
      reassignmentCorrectionOfStepOverflow();
    });

    context(`{boundaries} on change, shall correct {value},
    if it became out of the range`, function() {
      reassignmentCorrectionOfValueByBoundaries();
    });

    context(`{boundaries} on change, shall correct {step},
    if it stopped to correspond to the range`, function() {
      reassignmentCorrectionOfStepByBoundaries();
    });

    context(`{boundaries} shall correct {step}, if it became bigger,
    than difference of {boundaries(range)}`, function() {
      reassignmentCorrectionOfStepOverflowByBoundaries();
    });

    context(`{step} on change, shall correct {value},
    if it stopped to correspond to its value`, function() {
      reassignmentCorrectionOfValueByStep();
    });

  });


  describe(`shall change nearest {boundaries} value,
  if only a number is passed`, function() {

    context(`shall change {boundaries(min)},
    if passed value lay near to it`, function() {
      reassignmentBoundariesMin();
    });

    context(`shall change {boundaries(max)},
    if passed value lay near to it`, function() {
      reassignmentBoundariesMax();
    });

  });


  describe(`shall accept unlimited array of {value} values`, function() {

    context(`shall accept array of {value} values`, function() {
      reassignmentValueArray();
    });

    context(`shall accept array of {value} values and correct incorrect`, function() {
      reassignmentValueArrayWithIncorrect();
    });

  });


  describe("{value} shall be equal to average of {boundaries} by default", function() {
    reassignmentValueDefault();
  });

}
