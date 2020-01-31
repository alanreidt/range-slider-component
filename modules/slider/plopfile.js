const requireField = (fieldName) => {
  return (value) => {
    if (String(value).length === 0) {
      return `${fieldName} is required`;
    }
    return true;
  };
};

module.exports = (plop) => {
  plop.setGenerator("helper", {
    description: "Create a helper function",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your helper name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/helpers/{{camelCase name}}/{{camelCase name}}.js",
        templateFile: "plop-templates/helper/helper.js.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/helpers/{{camelCase name}}/{{camelCase name}}.test.js",
        templateFile: "plop-templates/helper/helper.test.js.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/helpers/{{camelCase name}}/index.js",
        templateFile: "plop-templates/helper/index.js.hbs",
      },
      {
        type: "add",
        path: "src/helpers/index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/helpers/index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{camelCase name}} } from "./{{camelCase name}}";`,
      },
    ],
  });

  plop.setGenerator("utility", {
    description: "Create a utility function",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your utility name?",
        validate: requireField("name"),
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/utilities/{{camelCase name}}/{{camelCase name}}.js",
        templateFile: "plop-templates/helper/helper.js.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/utilities/{{camelCase name}}/{{camelCase name}}.test.js",
        templateFile: "plop-templates/helper/helper.test.js.hbs",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/utilities/{{camelCase name}}/index.js",
        templateFile: "plop-templates/helper/index.js.hbs",
      },
      {
        type: "add",
        path: "src/utilities/index.js",
        templateFile: "plop-templates/injectable-index.js.hbs",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/utilities/index.js",
        pattern: `/* PLOP_INJECT_EXPORT */`,
        template: `export { {{camelCase name}} } from "./{{camelCase name}}";`,
      },
    ],
  });
};
