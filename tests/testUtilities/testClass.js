import { assert } from "chai";

export function testClass({ Class, methodName, methodGetterName } = {}) {
  return function({ constructorArgs, methodArgsList, expectations } = {}) {
    let constructorArgsRecord = "";

    for (const constructorArgsKey in constructorArgs) {
      const constructorArgsValue = constructorArgs[constructorArgsKey];

      constructorArgsRecord += `${constructorArgsKey} = ${constructorArgsValue}, `;
    }

    expectations.forEach((expectation, index) => {
      const subject = new Class(constructorArgs);
      const methodArgs = methodArgsList && methodArgsList[index];
      let methodArgsRecord = "";

      if (methodName && methodArgs) {
        for (const methodArgsKey in methodArgs) {
          const methodArgsValue = methodArgs[methodArgsKey];

          methodArgsRecord += `${methodArgsKey} = ${methodArgsValue}, `;
        }

        subject[methodName](methodArgs);
      }

      if (methodName && !methodArgs) {
        methodArgsRecord = constructorArgsRecord;

        subject[methodName]();
      }

      const subjectOutput = subject[methodGetterName]();
      methodArgsRecord = methodArgsRecord || "default values";

      context(`if ${methodArgsRecord} were passed`, function() {
        for (const expectationKey in expectation) {
          const expectationValue = expectation[expectationKey];
          const subjectOutputValue = subjectOutput[expectationKey];

          it(`than ${expectationKey} shall be equal to ${expectationValue}`, function() {
            assert.deepEqual(subjectOutputValue, expectationValue);
          });
        }
      });
    });
  };
}
