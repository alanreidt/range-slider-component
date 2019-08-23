import {DomainModel} from "../../src/domainModel";

export function initializationWithFloatFixed() {
  let options = {
    boundaries: [0, 999.95],
    value: [199.9, 600],
    step: 100.49,
  };
  let objectDomainModel = {
    boundaries: [0, 1000],
    value: [0, 100],
    step: 100,
    orientation: "horizontal",
    tooltips: false,
  };
  let subjectDomainModel = new DomainModel(options).options;

  for (let key in subjectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
