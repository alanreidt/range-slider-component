import { initialization } from "./specs/initialization";

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
    initialization();
  });
});
