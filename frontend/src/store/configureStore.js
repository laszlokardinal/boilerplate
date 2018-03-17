import { combineReducers, createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";

import * as services from "./services";
import * as routes from "./routes";
import * as reducers from "./reducers";

import { INITIALIZE } from "../actions.js";

const configureStore = () => {
  const middlewares = [
    // services
    // routes
  ];

  if (process.env.NODE_ENV === "development") {
    const logger = createLogger();
    middlewares.push(logger);
  }

  const rootReducer = combineReducers({
    // reducers
  });

  const store = createStore(rootReducer, applyMiddleware(...middlewares));

  store.dispatch({ type: INITIALIZE });

  return store;
};

export default configureStore;
