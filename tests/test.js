import { testFindClosestFactor } from "../src/utilities/findClosestFactor/findClosestFactor.test";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test";
import { testFindClosestDivisible } from "../src/utilities/findClosestDivisible/findClosestDivisible.test";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test";
import { testSliderAdapter } from "./SliderAdapter.test";
import { testSliderModel } from "./SliderModel.test";
import { testSlider } from "./slider.test";
import { testSetElementPosition } from "../src/utilities/setElementPosition/setElementPosition.test";
import { testSliderUI } from "./SliderUI.test";
import { testAdjustValueToStep } from "../src/helpers/adjustValueToStep/adjustValueToStep.test";
import "../src/utilities/findRatio/findRatio.test";
import "../src/utilities/findAntecedent/findAntecedent.test";
import "../src/utilities/toPercentage/toPercentage.test";
import "../src/utilities/toFixed/toFixed.test";
import "../src/utilities/findClosestTo/findClosestTo.test";
import "../src/helpers/findValuePositionBetween/findValuePositionBetween.test";
import "../src/helpers/findValueByRatioBetween/findValueByRatioBetween.test";

testAdjustValueToStep();
testFindClosestFactor();
testIsValueBetween();
testFindClosestDivisible();
testSetElementPosition();
testObserverMixin();

testSliderModel();
testSliderAdapter();
testSliderUI();
testSlider();
