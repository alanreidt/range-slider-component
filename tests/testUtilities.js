export function test(
  func,
  describeTest = template`${"...rest"} is equal to ${"expectation"}`,
) {
  return function(funcOptions, expectations) {
    expectations.forEach((expectation, index) => {
      const funcOption = funcOptions[index];

      it(describeTest(funcOption, expectation), function() {
        assert.deepEqual(func(...funcOption), expectation);
      });
    });
  };
}
