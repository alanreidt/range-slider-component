import { testFindClosestFactor } from "../src/utilities/findClosestFactor/findClosestFactor.test";
import { testGetNearestTo } from "../src/utilities/getNearestTo/getNearestTo.test";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test";
import { testFindClosestDivisible } from "../src/utilities/findClosestDivisible/findClosestDivisible.test";
import { testTranslateValueIntoPosition } from "../src/utilities/translateValueIntoPosition/translateValueIntoPosition.test";
import { testTranslateProportionIntoValue } from "../src/utilities/translateProportionIntoValue/translateProportionIntoValue.test";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test";
import { testSliderAdapter } from "./SliderAdapter.test";
import { testSliderModel } from "./SliderModel.test";
import { testSlider } from "./slider.test";
import { testSetElementPosition } from "../src/utilities/setElementPosition/setElementPosition.test";
import { testSliderUI } from "./SliderUI.test";
import { testAdjustValueToStep } from "../src/helpers/adjustValueToStep/adjustValueToStep.test";
import "../src/utilities/findRatio/findRatio.test";

testAdjustValueToStep();
testFindClosestFactor();
testGetNearestTo();
testIsValueBetween();
testFindClosestDivisible();
testTranslateValueIntoPosition();
testTranslateProportionIntoValue();
testSetElementPosition();
testObserverMixin();

testSliderModel();
testSliderAdapter();
testSliderUI();
testSlider();
