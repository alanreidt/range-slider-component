import { setElementPosition } from "./setElementPosition";


export function testSetElemenPosition() {


  describe("setElemenPosition function", function () {

    it("shall set element position", function () {
      const element = document.createElement("div");
      const position = "50%";
      const regexp = new RegExp(`${position}`);

      setElementPosition(element, position);
      const elementStyle = element.getAttribute("style");

      assert.isNotNull(elementStyle.match(regexp));
    });


    context("shall change element position", function () {
      const element = document.createElement("div");
      const positions = ["50%", "30%", "20%"];

      positions.forEach((position) => {
        const regexp = new RegExp(`${position}`);

        setElementPosition(element, position);

        const elementStyle = element.getAttribute("style");

        it(`element position is changed to ${position}`, function () {
          assert.isNotNull(elementStyle.match(regexp));
        });
      });
    });

  });


}
