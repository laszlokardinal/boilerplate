import proxyquire from "proxyquire";

describe("configureStore", () => {
  const dispatch = sinon.spy();
  const createStore = (...args) => ({ CREATE_STORE: args, dispatch });
  const combineReducers = (reducers) => ({ COMBINE_REDUCERS: reducers });
  const applyMiddleware = (...args) => ({ APPLY_MIDDLEWARE: args });

  const createLogger = () => "CREATE_LOGGER";

  proxyquire.noCallThru();
  const { default: configureStore } = proxyquire("./configureStore.js", {
    redux: { combineReducers, createStore, applyMiddleware },
    "redux-logger": { createLogger },
    "./routes": {},
    "./reducers": {},
    "./services": {}
  });
  proxyquire.callThru();

  it("builds the right reducer structure", () => {
    const store = configureStore();

    expect(store.CREATE_STORE[0]).to.deep.equal({
      COMBINE_REDUCERS: {}
    });
  });

  it("applies the right middlewares", () => {
    const store = configureStore();

    expect(store.CREATE_STORE[1]).to.deep.equal({
      APPLY_MIDDLEWARE: []
    });
  });

  it("applies redux-logger only in development mode", () => {
    const originalEnv = process.env.NODE_ENV;

    try {
      process.env.NODE_ENV = "production";

      expect(
        configureStore().CREATE_STORE[1].APPLY_MIDDLEWARE.filter(
          (middleware) => middleware === "CREATE_LOGGER"
        )
      ).to.have.length(0);

      process.env.NODE_ENV = "development";

      expect(
        configureStore().CREATE_STORE[1].APPLY_MIDDLEWARE.filter(
          (middleware) => middleware === "CREATE_LOGGER"
        )
      ).to.have.length(1);
    } finally {
      process.env.NODE_ENV = originalEnv;
    }
  });

  it("dispatches 'INITIALIZE'", () => {
    dispatch.resetHistory();

    const store = configureStore();

    expect(dispatch.args).to.deep.equal([[{ type: "INITIALIZE" }]]);
  });
});
