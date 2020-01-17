import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test";
import { testSlider } from "./slider.test";
import { testSliderUI } from "./SliderUI.test";
import { testAdjustValueToStep } from "../src/helpers/adjustValueToStep/adjustValueToStep.test";
import { testSliderModel } "./Model.test";
import "../src/utilities/findRatio/findRatio.test";
import "../src/utilities/findAntecedent/findAntecedent.test";
import "../src/utilities/toPercentage/toPercentage.test";
import "../src/utilities/toFixed/toFixed.test";
import "../src/utilities/findClosestTo/findClosestTo.test";
import "../src/helpers/findValuePositionBetween/findValuePositionBetween.test";
import "../src/helpers/findValueByRatioBetween/findValueByRatioBetween.test";
import "../src/utilities/isNumberBetween/isNumberBetween.test";
import "../src/utilities/isNumberInBetween/isNumberInBetween.test";
import "../src/utilities/findClosestDivisible/findClosestDivisible.test";
import "../src/utilities/findClosestFactor/findClosestFactor.test";
import "../src/utilities/isDivisible/isDivisible.test";
import "../src/utilities/either/either.test";

testAdjustValueToStep();
testObserverMixin();

testSliderModel();
testSliderUI();
testSlider();
