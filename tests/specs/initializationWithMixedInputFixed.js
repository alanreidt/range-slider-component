import {DomainModel} from "../../src/domainModel";

export function initializationWithMixedInputFixed() {
  let options = {
    boundaries: [0, "1000px"],
    value: ["0$", 600],
    step: "100",
  };
  let objectDomainModel = {
    boundaries: [0, 1000],
    value: [0, 600],
    step: 100,
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
