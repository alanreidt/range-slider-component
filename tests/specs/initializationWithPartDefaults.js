import {DomainModel} from "../../src/domainModel";

export function initializationWithPartDefaults() {
  let options = {
    boundaries: [5000, 40000],
    value: 20000,
    step: 50,
    orientation: "vertical",
  };
  let objectDomainModel = {
    boundaries: [5000, 40000],
    value: 20000,
    step: 50,
    orientation: "vertical",
    tooltips: false,
  };
  let subjectDomainModel = new DomainModel(options);

  for (let key in objectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
