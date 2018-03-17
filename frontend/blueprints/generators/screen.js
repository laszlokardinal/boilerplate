const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const content = (name) => `\
import React, { Component } from "react";
import PropTypes from "prop-types";

import {

} from "../elements";

import {

} from "../screens";

import {

} from "../layout";

class ${name} extends Component {
  static propTypes = {

  };

  render () {

    return (
      <div>

      </div>
    );
  }
};

export default ${name};
`;

const testContent = (name) => `\
import { ${name} } from "./index.js";

const defaultProps = {

};

describe("screens", () => {
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

const indexExport = (name) => `export ${name} from "./${name}.jsx";\n`;

const generate = (name) =>
  Promise.all([
    writeFile(`./src/view/screens/${name}.jsx`, content(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/view/screens/${name}.test.jsx`, testContent(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/view/screens/index.js`, indexExport(name), {
      encoding: "utf8",
      flag: "a"
    })
  ]);

const destroy = (name) => {
  return Promise.all([
    unlink(`./src/view/screens/${name}.jsx`),
    unlink(`./src/view/screens/${name}.test.jsx`),
    readFile(`./src/view/screens/index.js`, "utf8").then((content) => {
      const newContent = content
        .split(";\n")
        .filter((expression) => !expression.includes(`${name}`))
        .join(";\n");

      return writeFile(`./src/view/screens/index.js`, newContent, "utf8");
    })
  ]);
};

module.exports = {
  generate,
  destroy
};
