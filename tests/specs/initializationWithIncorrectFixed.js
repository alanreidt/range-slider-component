import {DomainModel} from "../../src/domainModel";

export function initializationWithIncorrectFixed() {
  let options = {
    boundaries: ["hundred", 200],
    value: [25, "p100"],
    step: -20,
    orientation: "right",
    tooltips: 7,
  };
  let objectDomainModel = {
    boundaries: [0, 200],
    value: 25,
    step: null,
    orientation: "horizontal",
    tooltips: false,
  };
  let subjectDomainModel = new DomainModel(options);

  for (let key in objectDomainModel) {

    it(`${key} is equal to ${objectDomainModel[key]}`, function() {
      assert.deepEqual( subjectDomainModel[key], objectDomainModel[key] );
    });

  }
}
