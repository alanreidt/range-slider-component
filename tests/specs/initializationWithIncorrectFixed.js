import {DomainModel} from "../../src/domainModel";

export function initializationWithIncorrectFixed() {
  let options = {
    boundaries: [-100, 300],
    value: [0, -100],
    step: -20,
    orientation: "right",
    tooltips: 7,
  };
  let objectDomainModel = {
    boundaries: [0, 300],
    value: [0, 100],
    step: null,
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
