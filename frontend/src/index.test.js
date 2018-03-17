import proxyquire from "proxyquire";

describe.only("index", () => {
  const render = sinon.spy();
  const createElement = (...args) => ({ CREATE_ELEMENT: args });
  const configureStore = () => "CONFIGURE_STORE";
  const App = () => null;

  it("renders <Root /> into #react-root", () => {
    sinon.stub(global.document, "getElementById").callsFake((...args) => ({
      GET_ELEMENT_BY_ID: args
    }));

    try {
      proxyquire("./index.js", {
        react: { createElement, Component: function() {} },
        "react-dom": { render },
        "./store/configureStore.js": { default: configureStore },
        "./view/App.jsx": { default: App }
      });

      expect(render.callCount).to.equal(1);

      expect(render.args[0][0].CREATE_ELEMENT[0]).to.be.a("function");
      expect(render.args[0][0].CREATE_ELEMENT[0].name).to.equal("Root");

      expect(render.args[0][0].CREATE_ELEMENT[1]).to.deep.equal({
        store: "CONFIGURE_STORE"
      });

      expect(render.args[0][1]).to.deep.equal({
        GET_ELEMENT_BY_ID: ["react-root"]
      });
    } finally {
      global.document.getElementById.restore();
    }
  });

  describe("<Root />", () => {
    it("calls forceUpdate on store change");
    it("renders App with state & dispatch");
  });
});
