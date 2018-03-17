const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const content = (name) => `\
import {

} from "../../actions.js";

const ${name}Service = () => ({ getState, dispatch }) => (next) => (action) => {
  const returnValue = next(action);

  switch (action.type) {
    case : {

    }
  }

  return returnValue;
};

export default ${name}Service;
`;

const testContent = (name) => `\
import { ${name}Service } from "./index.js";

describe("services", () => {
  describe("${name}Service", () => {
    describe("on unknown action", () => {
      it("returns next(action)", () => {
        const next = sinon.spy(() => "NEXT_RETURN_VALUE");
        const action = { type: "UNKNOWN" };

        expect(${name}Service()()(next)(action)).to.equal("NEXT_RETURN_VALUE");

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

const indexExport = (name) =>
  `export ${name}Service from "./${name}Service.js";\n`;

const generate = (name) =>
  Promise.all([
    writeFile(`./src/store/services/${name}Service.js`, content(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(
      `./src/store/services/${name}Service.test.js`,
      testContent(name),
      {
        encoding: "utf8",
        flag: "wx"
      }
    ),
    writeFile(`./src/store/services/index.js`, indexExport(name), {
      encoding: "utf8",
      flag: "a"
    })
  ]);

const destroy = (name) => {
  return Promise.all([
    unlink(`./src/store/services/${name}Service.js`),
    unlink(`./src/store/services/${name}Service.test.js`),
    readFile(`./src/store/services/index.js`, "utf8").then((content) => {
      const newContent = content
        .split(";\n")
        .filter((expression) => !expression.includes(`${name}Service`))
        .join(";\n");

      return writeFile(`./src/store/services/index.js`, newContent, "utf8");
    })
  ]);
};

module.exports = {
  generate,
  destroy
};
