import {Slider} from "../../../src/Slider";

export function reassignmentValueDefault() {
  let options = {
    boundaries: [100, 500],
    step: 20,
    orientation: "vertical",
    tooltips: true,
  };
  let testObject = {
    values: 300,
  };
  let testSubject = new Slider(options);

  for (let key in testObject) {

    it(`${key} is equal to ${testObject[key]}`, function() {
      assert.deepEqual( testSubject[key], testObject[key] );
    });

  }
}
