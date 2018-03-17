const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const content = (name) => `\
import {

} from "../../actions.js";

const ${name}Route = ({ getState, dispatch }) => (next) => (action) => {
  const returnValue = next(action);

  switch (action.type) {
    case : {

    }
  }

  return returnValue;
};

export default ${name}Route;
`;

const testContent = (name) => `\
import { ${name}Route } from "./index.js";

describe("routes", () => {
  describe("${name}Route", () => {
    describe("on unknown action", () => {
      it("returns next(action)", () => {
        const next = sinon.spy(() => "NEXT_RETURN_VALUE");
        const action = { type: "UNKNOWN" };

        expect(${name}Route()(next)(action)).to.equal("NEXT_RETURN_VALUE");

        expect(next.callCount).to.equal(1);
        expect(next.args[0][0]).to.equal(action);
      });
    });

    describe("on action with type ''", () => {
      it("");
    });
  });
});
`;

const indexExport = (name) => `export ${name}Route from "./${name}Route.js";\n`;

const generate = (name) =>
  Promise.all([
    writeFile(`./src/store/routes/${name}Route.js`, content(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/store/routes/${name}Route.test.js`, testContent(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(`./src/store/routes/index.js`, indexExport(name), {
      encoding: "utf8",
      flag: "a"
    })
  ]);

const destroy = (name) => {
  return Promise.all([
    unlink(`./src/store/routes/${name}Route.js`),
    unlink(`./src/store/routes/${name}Route.test.js`),
    readFile(`./src/store/routes/index.js`, "utf8").then((content) => {
      const newContent = content
        .split(";\n")
        .filter((expression) => !expression.includes(`${name}Route`))
        .join(";\n");

      return writeFile(`./src/store/routes/index.js`, newContent, "utf8");
    })
  ]);
};

module.exports = {
  generate,
  destroy
};
