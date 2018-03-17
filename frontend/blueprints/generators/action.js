const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const actionExport = (name) => `export const ${name} = "${name}";\n`;

const generate = (name) =>
  writeFile(`./src/actions.js`, actionExport(name), {
    encoding: "utf8",
    flag: "a"
  });

const destroy = (name) =>
  readFile(`./src/actions.js`, "utf8").then((content) => {
    const newContent = content
      .split(";\n")
      .filter((expression) => !expression.includes(`${name}`))
      .join(";\n");

    return writeFile(`./src/actions.js`, newContent, "utf8");
  });

module.exports = {
  generate,
  destroy
};
