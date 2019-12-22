import { testGetClosestFactorOf } from "../src/utilities/getClosestFactorOf/getClosestFactorOf.test";
import { testGetNearestTo } from "../src/utilities/getNearestTo/getNearestTo.test";
import { testIsValueBetween } from "../src/utilities/isValueBetween/isValueBetween.test";
import { testGetOverstepOf } from "../src/utilities/getOverstepOf/getOverstepOf.test";
import { testGetNearestDivisibleOf } from "../src/utilities/getNearestDivisibleOf/getNearestDivisibleOf.test";
import { testGetPositionInPercentageOf } from "../src/utilities/getPositionInPercentageOf/getPositionInPercentageOf.test";
import { testTranslateProportionIntoValue } from "../src/utilities/translateProportionIntoValue/translateProportionIntoValue.test";
import { testObserverMixin } from "../src/utilities/observerMixin/observerMixin.test";
import { testSliderAdapter } from "./SliderAdapter.test";
import { testSliderModel } from "./SliderModel.test";
import { testSlider } from "./slider.test";
import { testSetElementPosition } from "../src/utilities/setElementPosition/setElementPosition.test";
import { testSliderUI } from "./SliderUI.test";

testGetClosestFactorOf();
testGetNearestTo();
testIsValueBetween();
testGetOverstepOf();
testGetNearestDivisibleOf();
testGetPositionInPercentageOf();
testTranslateProportionIntoValue();
testSetElementPosition();
testObserverMixin();

testSliderModel();
testSliderAdapter();
testSliderUI();
testSlider();
