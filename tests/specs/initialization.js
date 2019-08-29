import { initializationWithDefaults } from "./initializationWithDefaults";
import { initializationWithPartDefaults } from "./initializationWithPartDefaults";
import { initializationWithIncorrectFixed } from "./initializationWithIncorrectFixed";
import { initializationWithMixedInputFixed } from "./initializationWithMixedInputFixed";

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
    describe("parse number from mixed inputs", function() {
      initializationWithMixedInputFixed();
    });

  });
}
