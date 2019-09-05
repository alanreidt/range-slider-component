import {initializationWithDefaults} from "./initializationWithDefaults";
import {initializationWithPartDefaults} from "./initializationWithPartDefaults";
import {initializationWithIncorrectFixed} from "./initializationWithIncorrectFixed";
import {initializationWithMixedInputFixed} from "./initializationWithMixedInputFixed";

export function initialization() {

  describe("shall assign default values for unpassed parameters", function () {

    context("shall assign default values, if nothing is passed", function() {
      initializationWithDefaults();
    });

    context("shall assign default values for unpassed parameters, if only part is passed", function() {
      initializationWithPartDefaults();
    });

  });


  describe("shall assign fixed values for incorrect arguments", function() {

    context("shall assign default value if incorrect one is passed", function() {
      initializationWithIncorrectFixed();
    });

    context("shall parse number from mixed inputs", function() {
      initializationWithMixedInputFixed();
    });

  });

}
