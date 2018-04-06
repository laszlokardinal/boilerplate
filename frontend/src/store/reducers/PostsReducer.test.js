import { PostsReducer } from "./index.js";

describe("reducers", () => {
  describe("PostsReducer", () => {
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
