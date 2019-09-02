import {Slider} from "../../src/Slider";

export function initializationWithIncorrectFixed() {
  let options = {
    boundaries: ["hundred", 200],
    value: [25, "p100"],
    step: -20,
    orientation: "right",
    tooltips: 7,
  };
  let testObject = {
    boundaries: [0, 200],
    value: 25,
    step: null,
    orientation: "horizontal",
    tooltips: false,
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
