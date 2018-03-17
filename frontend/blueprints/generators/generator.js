const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const content = (name, path) => `\
const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const generate = (name) => {
  const content =
\`

\`;

  return writeFile(\`./${path}/\${name}.js\`, content, {
    encoding: "utf8",
    flag: "wx"
  });
}

const destroy = (name) => {
  return unlink(\`./${path}/\${name}.js\`);
}

module.exports = {
  generate,
  destroy
};
`;

const generate = (name, inputPath) => {
  const path = new RegExp("^(?:./)?(.*?)/?$").exec(inputPath)[1];

  return writeFile(`./blueprints/generators/${name}.js`, content(name, path), {
    encoding: "utf8",
    flag: "wx"
  });
};

const destroy = (name) => {
  return unlink(`./blueprints/generators/${name}.js`);
};

module.exports = {
  generate,
  destroy
};
