import {DomainModel} from "../src/domainModel";

describe("DomainModel", function() {
  // describe("accepts only positive numbers", function() {
  // });

  describe("creates instance with default values", function() {
    let newDomainModel = new DomainModel();
    let newDomainModelOptions = newDomainModel.options;
    let defaultDomainModel = {
      min: 0,
      max: 100,
      values: [0, 100],
      step: null,
      orientation: "horizontal",
      tooltips: false,
    };

    for (let key in newDomainModelOptions) {

      it(`${key} is equal to ${defaultDomainModel[key]}`, function() {
        assert.deepEqual( newDomainModelOptions[key], defaultDomainModel[key] );
      });

    }

  });

});
