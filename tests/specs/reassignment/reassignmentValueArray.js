import {Slider} from "../../../src/Slider";

export function reassignmentValueArray() {
  let options = {
    boundaries: [100, 500],
    values: [100, 200, 300, 460],
    step: 20,
    orientation: "vertical",
    hasTooltips: true,
  };
  let testObject = {
    values: [100, 200, 300, 460],
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
