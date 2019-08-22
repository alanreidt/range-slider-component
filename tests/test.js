import {DomainModel} from "../src/domainModel";

/**
 * TODO:
 *  - Initialization
 *    - shall assign default values for unpassed parameters (+)
 *      - shall assign default values, if nothing is passed (+)
 *      - shall assign default values for unpassed parameters,
 *        if only part is passed (+)
 *    - shall assign fixed values for incorrect arguments (+)
 *      - shall assign default value if incorrect one is passed (+)
 *      - shall round float values to the nearest integer one (+)
 *  - Initialization & Reassigning:
 *    - shall accept only positive integer values:
 *      - shall assign default value if negative one is passed
 *      - shall round float values to the nearest integer one
 *    - options:
 *      - boundaries:
 *        - shall assign bigger value to max, the another — to min
 *        - should accept as a number, as an array
 *        - should change {boundaries(max)} or {boundaries(min)}, if number is passed
 *      - value:
 *        - shall accept as a number, as an array
 *        - shall round value to the nearest possible, in order to correspond to {step}
 *        - shall assign value to nearest {boundaries(max)} or {boundaries(min)},
 *          if number is out of {boundaries} range
 *        - shall assign value of an array to default, if it is out of {boundaries} range
 *      - step:
 *        - shall round value to the nearest possible one if (boundaries % step === 0)
 *        - shall assign value to {boundaries(max)} if passed value > {boundaries(max)}
 */

describe("DomainModel", function() {
  describe("Initialization process", function() {


    describe("shall assign default values for unpassed parameters", function () {

      describe("assigns default values, if nothing is passed", function() {
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
      });

      describe("assigns default values for unpassed parameters, if only part is passed", function() {
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
      });

    });


    // shall assign fixed values for uncorrect arguments
      // shall assign default value if negative one is passed
      // shall round float values to the nearest integer one
    describe("shall assign fixed values for incorrect arguments", function() {

      describe("assigns default value if incorrect one is passed", function() {
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
      });

      describe("rounds float values to the nearest integer one", function() {
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
      });

    });

  });
});
