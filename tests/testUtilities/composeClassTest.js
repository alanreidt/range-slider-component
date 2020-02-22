import { assert } from 'chai';

const composeClassTest = function composeClassTestFromTestUtilities({
  Class,
  methodName,
  methodGetterName,
} = {}) {
  return ({ constructorArgs, methodArgsList, expectations } = {}) => {
    let constructorArgsRecord = '';

    Object.keys(constructorArgs).forEach((constructorArgsKey) => {
      const constructorArgsValue = constructorArgs[constructorArgsKey];

      constructorArgsRecord += `${constructorArgsKey} = ${constructorArgsValue}, `;
    });

    expectations.forEach((expectation, index) => {
      const subject = new Class(constructorArgs);
      const methodArgs = methodArgsList && methodArgsList[index];
      let methodArgsRecord = '';

      if (methodName && methodArgs) {
        Object.keys(methodArgs).forEach((methodArgsKey) => {
          const methodArgsValue = methodArgs[methodArgsKey];

          methodArgsRecord += `${methodArgsKey} = ${methodArgsValue}, `;
        });

        subject[methodName](methodArgs);
      }

      if (methodName && !methodArgs) {
        methodArgsRecord = constructorArgsRecord;

        subject[methodName]();
      }

      const subjectOutput = subject[methodGetterName]();
      methodArgsRecord = methodArgsRecord || 'default values';

      context(`if ${methodArgsRecord} were passed`, () => {
        Object.keys(expectation).forEach((expectationKey) => {
          const expectationValue = expectation[expectationKey];
          const subjectOutputValue = subjectOutput[expectationKey];

          it(`than ${expectationKey} shall be equal to ${expectationValue}`, () => {
            assert.deepEqual(subjectOutputValue, expectationValue);
          });
        });
      });
    });
  };
};

export default composeClassTest;
