import {Slider} from "../../../src/Slider";

export function reassignmentValueArrayWithIncorrect() {
  let options = {
    boundaries: [100, 500],
    value: [100, 200, 300, "Ben", 460, false],
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testObject = {
    value: [100, 200, 300, 460],
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
