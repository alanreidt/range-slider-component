import { testGetClosestFactorOf } from "../src/utilities/getClosestFactorOf/getClosestFactorOf.test";
import { testGetNearestTo } from "../src/utilities/getNearestTo/getNearestTo.test";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test";
import { testFindClosestDivisible } from "../src/utilities/findClosestDivisible/findClosestDivisible.test";
import { testGetPositionInPercentageOf } from "../src/utilities/getPositionInPercentageOf/getPositionInPercentageOf.test";
import { testTranslateProportionIntoValue } from "../src/utilities/translateProportionIntoValue/translateProportionIntoValue.test";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test";
import { testSliderAdapter } from "./SliderAdapter.test";
import { testSliderModel } from "./SliderModel.test";
import { testSlider } from "./slider.test";
import { testSetElementPosition } from "../src/utilities/setElementPosition/setElementPosition.test";
import { testSliderUI } from "./SliderUI.test";
import { testCoordinateWithStep } from "../src/helpers/coordinateWithStep/coordinateWithStep.test";

testCoordinateWithStep();
testGetClosestFactorOf();
testGetNearestTo();
testIsValueBetween();
testFindClosestDivisible();
testGetPositionInPercentageOf();
testTranslateProportionIntoValue();
testSetElementPosition();
testObserverMixin();

testSliderModel();
testSliderAdapter();
testSliderUI();
testSlider();
