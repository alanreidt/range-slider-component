import {initialization} from "./specs/initialization";

/**
 * TODO:
 *  - Initialization test (+):
 *    - shall assign default values for unpassed parameters (++)
 *      - shall assign default values, if nothing is passed (++)
 *      - shall assign default values for unpassed parameters,
 *        if only part is passed (++)
 *    - shall assign fixed values for incorrect arguments (++)
 *      - shall assign default value if incorrect one is passed (++)
 *      - shall parse number from mixed inputs (++)
 *  - Reassignment test:
 *    - shall change values, if correct one is passed
 *    - shall not change values, if incorrect one is passed
 *    - shall correct values
 *      - {boundaries} on change, shall correct {value},
 *        if it became out of the range
 *      - {boundaries} on change, shall correct {step},
 *        if it stopped to correspond to the range
 *      - {boundaries} shall correct {step}, if it became bigger, than {boundaries(max)}
 *      - {step} on change, shall correct {value},
 *        if it stopped to correspond to its value
 *      - shall correct {value}, if passed value is out of {boundaries}
 *      - shall correct {value}, if passed value isn't correspond to {step}
 *      - shall correct {step}, if passed value isn't correspond to {boundaries(range)}
 *      - shall correct {step}, if passed value is bigger than {boundaries(max)}
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
 *        - shall correct {step} if it's not correspond (boundaries % step !== 1)
 *        - should change direction (ltr or rtl) according to inputed value order
 *        - should accept not only "numbers" (colors)
 *      - value:
 *        - shall accept number or array of numbers — will result in mono-valued or multi-valued slider,
 *          accordingly (+)
 *        - shall assign previous value instead of incorrect input
 *          ( isNaN( parseFloat(value) ) ) (+)
 *        - should assign correct values and cut off incorred ones (+)
 *        - shall be equal to average of {boundaries}, if it isn't changed
 *        - shall round value to the nearest possible, in order to correspond to {step}
 *        - shall assign value to the nearest {boundaries(max)} or {boundaries(min)},
 *          if number is out of {boundaries} range
 *        - should accept keywords: min(start), middle(center), max(end)
 *      - step:
 *        - shall accept only positive number (+)
 *        - shall round value to the nearest possible one if (boundaries % step !== 1)
 *        - shall assign value to {boundaries(max)} if passed value > {boundaries(max)}
 *        - shall correct {value} in order to correspond to its value
 *        - should accept quantity of steps somehow
 *      - orientation:
 *        - shall accept only string "horizontal" or "vertical" (+)
 *        - shall assign default value if incorrect one is passed (+)
 *      - tooltips:
 *        - shall accept only boolean true or false (!) (+)
 *        - shall assign default value if incorrect one is passed (+)
 */

describe("Slider", function() {
  describe("Initialization test", function() {
    initialization();
  });
});
