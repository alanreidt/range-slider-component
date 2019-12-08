import { testGetClosestFactorOf } from "../src/utilities/getClosestFactorOf/getClosestFactorOf.test";
import { testGetNearestTo } from "../src/utilities/getNearestTo/getNearestTo.test.js";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test.js";
import { testGetOverstepOf } from "../src/utilities/getOverstepOf/getOverstepOf.test.js";
import { testGetNearestDivisibleOf } from "../src/utilities/getNearestDivisibleOf/getNearestDivisibleOf.test.js";
import { testGetPositionInPercentageOf } from "../src/utilities/getPositionInPercentageOf/getPositionInPercentageOf.test.js";
import { testTranslateProportionIntoValue } from "../src/utilities/translateProportionIntoValue/translateProportionIntoValue.test.js";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test.js";
import { testSliderAdapter } from "./SliderAdapter.test.js";
import { testSliderModel } from "./SliderModel.test.js";
import { testSlider } from "./slider.test.js";
import { testSetElemenPosition } from "../src/utilities/setElementPosition/setElementPosition.test.js";
import { testSliderUI } from "./SliderUI.test";

testGetClosestFactorOf();
testGetNearestTo();
testIsValueBetween();
testGetOverstepOf();
testGetNearestDivisibleOf()
testGetPositionInPercentageOf();
testTranslateProportionIntoValue();
testSetElemenPosition();
testObserverMixin();

testSliderModel();
testSliderAdapter();
testSliderUI();
testSlider();
