import {DomainModel} from "../../src/domainModel";

export function initializationWithDefaults() {
  let subjectDomainModel = new DomainModel().options;
  let objectDomainModel = {
    boundaries: [0, 100],
    value: [0, 100],
    step: null,
    orientation: "horizontal",
    tooltips: false,
  };

  for (let key in subjectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
