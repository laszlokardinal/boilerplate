const { promisify } = require("util");
const fs = require("fs");

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const unlink = promisify(fs.unlink);

const content = (name) => `\
import {

} from "../../actions.js";

const initialState = {

};

const ${name}Reducer = (state = initialState, action) => {
  switch (action.type) {
    case :
      return { ...state };

  }

  return state;
};

export default ${name}Reducer;
`;

const testContent = (name) => `\
import { ${name}Reducer } from "./index.js";

describe("reducers", () => {
  describe("${name}Reducer", () => {
    describe("on initial call", () => {
      it("returns the initial state", () => {
        expect(authReducer(undefined, { type: "" })).to.deep.equal({

        });
      });
    });

    describe("on action with unknown type type", () => {
      it("returns the previous state", () => {
        const state = {};

        expect(authReducer(state, { type: "UNKNOWN_ACTION" })).to.equal(state);
      });
    });

    describe("on action with type ''", () => {
      it("");
    });
  });
});
`;

const indexExport = (name) =>
  `export ${name}Reducer from "./${name}Reducer.js";\n`;

const generate = (name) =>
  Promise.all([
    writeFile(`./src/store/reducers/${name}Reducer.js`, content(name), {
      encoding: "utf8",
      flag: "wx"
    }),
    writeFile(
      `./src/store/reducers/${name}Reducer.test.js`,
      testContent(name),
      {
        encoding: "utf8",
        flag: "wx"
      }
    ),
    writeFile(`./src/store/reducers/index.js`, indexExport(name), {
      encoding: "utf8",
      flag: "a"
    })
  ]);

const destroy = (name) => {
  return Promise.all([
    unlink(`./src/store/reducers/${name}Reducer.js`),
    unlink(`./src/store/reducers/${name}Reducer.test.js`),
    readFile(`./src/store/reducers/index.js`, "utf8").then((content) => {
      const newContent = content
        .split(";\n")
        .filter((expression) => !expression.includes(`${name}Reducer`))
        .join(";\n");

      return writeFile(`./src/store/reducers/index.js`, newContent, "utf8");
    })
  ]);
};

module.exports = {
  generate,
  destroy
};
