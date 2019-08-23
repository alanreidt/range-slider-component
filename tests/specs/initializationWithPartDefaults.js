import {DomainModel} from "../../src/domainModel";

export function initializationWithPartDefaults() {
  let options = {
    boundaries: [5000, 40000],
    step: 50,
    orientation: "vertical",
  };
  let objectDomainModel = {
    boundaries: [5000, 40000],
    value: [5000, 40000],
    step: 50,
    orientation: "vertical",
    tooltips: false,
  };
  let subjectDomainModel = new DomainModel(options).options;

  for (let key in subjectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
