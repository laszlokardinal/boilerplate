const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const content = (name) => `\
import React from "react";
import PropTypes from "prop-types";

import style from "./${name}.scss";

const ${name} = ({ }) => {

  return (
    <div className={style.wrapper}>

    </div>
  );
};

${name}.propTypes = {

};

${name}.defaultProps = {

};

export default ${name};
`;

const testContent = (name) => `\
import { ${name} } from "./index.js";

const defaultProps = {

};

describe("elements", () => {
  describe("<${name} />", () => {
    describe("matches snapshot", () => {
      it("with default props", () => {
        const wrapper = shallow(<${name} {...defaultProps} />);

        snapshot(toJson(wrapper));
      });
    });

    describe("", () => {
      it("");
    });
  });
});
`;

const scssContent = (name) => `\
@import "../variables.scss";

.wrapper {

}
`;

const indexExport = (name) => `export ${name} from "./${name}.jsx";\n`;

const generate = (name) =>
  Promise.all([
    writeFile(`./src/view/elements/${name}.jsx`, content(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/view/elements/${name}.test.jsx`, testContent(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/view/elements/${name}.scss`, scssContent(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/view/elements/index.js`, indexExport(name), {
      encoding: "utf8",
      flag: "a"
    })
  ]);

const destroy = (name) => {
  return Promise.all([
    unlink(`./src/view/elements/${name}.jsx`),
    unlink(`./src/view/elements/${name}.test.jsx`),
    unlink(`./src/view/elements/${name}.scss`),
    readFile(`./src/view/elements/index.js`, "utf8").then((content) => {
      const newContent = content
        .split(";\n")
        .filter((expression) => !expression.includes(`${name}`))
        .join(";\n");

      return writeFile(`./src/view/elements/index.js`, newContent, "utf8");
    })
  ]);
};

module.exports = {
  generate,
  destroy
};
