import { initializationWithDefaults } from "./initializationWithDefaults";
import { initializationWithPartDefaults } from "./initializationWithPartDefaults";
import { initializationWithIncorrectFixed } from "./initializationWithIncorrectFixed";
import { initializationWithFloatFixed } from "./initializationWithFloatFixed";

export function initialization() {
  describe("shall assign default values for unpassed parameters", function () {

    describe("assigns default values, if nothing is passed", function() {
      initializationWithDefaults();
    });
    describe("assigns default values for unpassed parameters, if only part is passed", function() {
      initializationWithPartDefaults();
    });

  });


  describe("shall assign fixed values for incorrect arguments", function() {

    describe("assigns default value if incorrect one is passed", function() {
      initializationWithIncorrectFixed();
    });
    describe("rounds float values to the nearest integer one", function() {
      initializationWithFloatFixed();
    });

  });
}
