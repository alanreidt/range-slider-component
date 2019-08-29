import {DomainModel} from "../../src/domainModel";

export function initializationWithDefaults() {
  let subjectDomainModel = new DomainModel();
  let objectDomainModel = {
    boundaries: [0, 100],
    value: 50,
    step: null,
    orientation: "horizontal",
    tooltips: false,
  };

  for (let key in objectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
