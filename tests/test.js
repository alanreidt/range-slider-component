import {initialization} from "./specs/initialization";

/**
 * TODO:
 *  - Initialization tests (+):
 *    - shall assign default values for unpassed parameters (++)
 *      - shall assign default values, if nothing is passed (++)
 *      - shall assign default values for unpassed parameters,
 *        if only part is passed (++)
 *    - shall assign fixed values for incorrect arguments (+)
 *      - shall assign default value if incorrect one is passed (+)
 *      - shall round float values to the nearest integer one (+)
 *      - shall parse number from mixed inputs (+)
 *  - Reassigning Tests:
 *  - Business Logic:
 *    - options:
 *      - default values:
 *        - boudaries: [0, 100],
 *        - value: ({boundaries(max)} - {boundaries(min)}) / 2,
 *        - step: null,
 *        - orientation: "horizontal",
 *        - tooltips: false,
 *      - boundaries:
 *        - shall accept array of numbers (+)
 *        - should also accept numbers (would change appropriate previous one) (+)
 *        - shall leave array with previous values instead of incorrect input
 *          ( isNaN( parseFloat(value) ) ) (+)
 *        - should assign previous values instead of each incorrect one (+)
 *        - shall correct {value} if it's out of {boundaries(range)}
 *        - should change direction (ltr or rtl) according to inputed value order
 *        - should accept not only "numbers" (colors)
 *      - value:
 *        - shall accept number or array of numbers — will result in mono-valued or multi-valued slider,
 *          accordingly (+)
 *        - shall assign previous value instead of incorrect input
 *          ( isNaN( parseFloat(value) ) ) (+)
 *        - should assign correct values and cut off incorred ones (+)
 *        - shall round value to the nearest possible, in order to correspond to {step}
 *        - shall assign value to the nearest {boundaries(max)} or {boundaries(min)},
 *          if number is out of {boundaries} range
 *        - should accept keywords: min(start), middle(center), max(end)
 *      - step:
 *        - shall accept only positive number (+)
 *        - shall round value to the nearest possible one if (boundaries % step === 1)
 *        - shall assign value to {boundaries(max)} if passed value > {boundaries(max)}
 *        - shall correct {value} in order to correspond to its value
 *      - orientation:
 *        - shall accept only string "horizontal" or "vertical" (+)
 *        - shall assign default value if incorrect one is passed (+)
 *      - tooltips:
 *        - shall accept only boolean true or false (!) (+)
 *        - shall assign default value if incorrect one is passed (+)
 */

describe("Slider", function() {
  describe("Initialization process", function() {
    initialization();
  });
});
